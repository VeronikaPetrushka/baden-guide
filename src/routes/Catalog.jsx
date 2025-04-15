import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Modal, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import SharedLayout from "./SharedLayout"
import catalog from "../constants/catalog";

const { width } = Dimensions.get('window');

const Catalog = () => {
    const navigation = useNavigation();
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredCatalog, setFilteredCatalog] = useState(catalog);

    const toggleSelection = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category))
        } else {
            setSelectedCategories([...selectedCategories, category])
        }
    };

    const applyFilter = async () => {
        const hasStatusFilter = selectedCategories.includes('Planned') || selectedCategories.includes('Visited');

        if (selectedCategories.length === 0) {
            setFilteredCatalog(catalog);
            setFilterVisible(false);
            return;
        }

        if (hasStatusFilter) {
            try {
                const storedCatalogStatus = await AsyncStorage.getItem('catalogStatus');
                const parsedStatus = storedCatalogStatus ? JSON.parse(storedCatalogStatus) : [];

                const filteredByStatus = parsedStatus.filter((item) =>
                    selectedCategories.includes(item.status)
                );

                const categoriesOnly = selectedCategories.filter((c) => c !== 'Planned' && c !== 'Visited');

                const finalFiltered = categoriesOnly.length > 0
                    ? filteredByStatus.filter((item) =>
                        categoriesOnly.some((category) => item.category.includes(category))
                    )
                    : filteredByStatus;

                setFilteredCatalog(finalFiltered);
            } catch (error) {
                console.log('Error loading catalogStatus:', error);
            }
        } else {
            const filtered = catalog.filter((item) =>
                selectedCategories.some((category) => item.category.includes(category))
            );

            setFilteredCatalog(filtered);
        }

        setFilterVisible(false);
    };

    return (
        <SharedLayout menu={true} back={'1'}>
            <View style={styles.container}>

                <Text style={styles.title}>Spa and thermal springs catalog</Text>

                <TouchableOpacity onPress={() => setFilterVisible(true)}>
                    <Image source={require('../assets/icons/filter.png')} style={styles.filterIcon} />
                </TouchableOpacity>

                <ScrollView style={{width: '100%'}}>
                    {
                        filteredCatalog.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate('ReadCatalog', {item})}>
                                <Image source={item.image} style={styles.cardImage} />
                                <Text style={styles.cardName}>{item.name}</Text>
                            </TouchableOpacity>
                        ))
                    }
                    <View style={{height: 120}} />
                </ScrollView>

                {
                    filterVisible && (
                        <Modal
                            animationType="slide"
                            transparent
                            visible={filterVisible}
                            onRequestClose={() => setFilterVisible(false)}
                        >
                            <View style={styles.filter}>

                                <TouchableOpacity
                                    style={{ position: 'absolute', top: 24, alignSelf: 'center' }}
                                    onPress={() => setFilterVisible(false)}
                                >
                                    <View style={styles.line} />
                                </TouchableOpacity>

                                <Text style={styles.subTitle}>Filter</Text>

                                {
                                    ['Thermen', 'Saunen', 'Wellness', 'Wasserwelten'].map((category, index) => (
                                        <View style={styles.row} key={index}>
                                            <Text style={styles.category}>{category}</Text>
                                            <TouchableOpacity style={styles.button} onPress={() => toggleSelection(category)}>
                                                {
                                                    selectedCategories.some((c) => c === category) && <View style={styles.selected} />
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                }

                                <View style={{height: 15}} />

                                {
                                    ['Planned', 'Visited'].map((status, index) => (
                                        <View style={styles.row} key={index}>
                                            <Text style={styles.category}>{status}</Text>
                                            <TouchableOpacity style={styles.button} onPress={() => toggleSelection(status)}>
                                                {
                                                    selectedCategories.some((c) => c === status) && <View style={styles.selected} />
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    ))
                                }

                                <TouchableOpacity
                                    style={[styles.applyFilterBtn, selectedCategories.length === 0 && { backgroundColor: '#696969' }]}
                                    disabled={selectedCategories.length === 0}
                                    onPress={applyFilter}
                                >
                                    <Text style={[styles.applyFilterBtnText, selectedCategories.length === 0 && {color: 'rgba(255, 255, 255, 0.25)'}]}>Apply</Text>
                                </TouchableOpacity>

                                {
                                    selectedCategories.length > 0 && (
                                        <TouchableOpacity
                                            style={[styles.applyFilterBtn, { backgroundColor: '#ccc', marginTop: 10 }]}
                                            onPress={() => {
                                                setSelectedCategories([]);
                                                setFilteredCatalog(catalog);
                                                setFilterVisible(false);
                                            }}
                                        >
                                            <Text style={[styles.applyFilterBtnText, { color: '#000' }]}>Reset Filter</Text>
                                        </TouchableOpacity>
                                    )
                                }

                            </View>
                        </Modal>
                    )
                }

            </View>
        </SharedLayout>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    title: {
        fontSize: 25,
        fontWeight: '900',
        color: '#a5855d',
        textAlign: 'center',
        marginBottom: 10
    },

    filterIcon: {
        width: 35,
        height: 35,
        alignSelf: 'flex-end',
        marginBottom: 10,
        resizeMode: 'contain'
    },

    card: {
        width: '100%',
        backgroundColor: '#2d2d2d',
        borderRadius: 24,
        marginBottom: 10,
        padding: 10
    },

    cardImage: {
        width: '100%',
        height: 164,
        resizeMode: 'cover',
        borderRadius: 24,
        marginBottom: 8
    },
    
    cardName: {
        fontSize: 14,
        fontWeight: '900',
        color: '#fff'
    },

    filter: {
        width: width,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#2d2d2d',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 19,
        paddingVertical: 54
    },

    subTitle: {
        fontSize: 25,
        fontWeight: '900',
        color: '#fff',
        marginBottom: 10,
        alignSelf: 'flex-start'
    },

    line: {
        width: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 5.33,
    },

    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 0.33,
        borderBottomColor: '#fff'
    },

    category: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },

    button: {
        width: 24,
        height: 24,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#a5855d',
        padding: 3
    },

    selected: {
        width: '100%',
        height: '100%',
        backgroundColor: '#a5855d',
        borderRadius: 100
    },

    applyFilterBtn: {
        width: '100%',
        padding: 15,
        borderRadius: 54,
        backgroundColor: '#a5855d',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },

    applyFilterBtnText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#fff'
    }

});

export default Catalog;