import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView, Modal } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import SharedLayout from "./SharedLayout"

const { width } = Dimensions.get('window');

const ReadCatalog = ({ route }) => {
    const { item } = route.params;
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([]);
    const [statusVisible, setStatusVisible] = useState(false);
    const [status, setStatus] = useState(null);
    const [statusList, setStatusList] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
            } catch (error) {
            console.log('Error loading favorites:', error);
            }
        };

        loadFavorites();
    }, []);

    useEffect(() => {
        const loadStatus = async () => {
            try {
            const stored = await AsyncStorage.getItem('catalogStatus');
            const parsed = stored ? JSON.parse(stored) : [];

            setStatusList(parsed);

            const current = parsed.find((i) => i.name === item.name);
            if (current?.status) setStatus(current.status);
            } catch (err) {
            console.log('Status load error:', err);
            }
        };

        loadStatus();
    }, []);

    const handleFavorite = async () => {
        try {
            let storedFavorites = await AsyncStorage.getItem('favorites');
            storedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

            if (isFavorite) {
                const updated = storedFavorites.filter((f) => f.name !== item.name);
                await AsyncStorage.setItem('favorites', JSON.stringify(updated));
                    
                setFavorites(updated);
            } else {
                const updated = [...storedFavorites, item];
                await AsyncStorage.setItem('favorites', JSON.stringify(updated));

                setFavorites(updated);
            }
        } catch (error) {
            alert('Error updating favorites');
        }
    };

    const isFavorite = favorites.some((f) => f.name === item.name);

    const updateStatus = async (newStatus) => {
        try {
            let updated = [...statusList].filter((i) => i.name !== item.name);

            updated.push({ ...item, status: newStatus });
            await AsyncStorage.setItem('catalogStatus', JSON.stringify(updated));

            setStatus(newStatus);
            setStatusList(updated);
            setStatusVisible(false);
        } catch (err) {
            console.log('Status update error:', err);
        }
    };


    return (
        <SharedLayout back={'2'}>
            <View style={styles.container}>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/icons/back.png')} style={{width: 27, height: 24, resizeMode: 'contain'}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} onPress={handleFavorite}>
                        <Image
                            source={isFavorite ? require('../assets/icons/fav.png') : require('../assets/icons/no-fav.png')}
                            style={{ width: 31, height: 28, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{width: '100%'}}>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.category}>{item.category}</Text>
                    </View>
                    <Image source={item.image} style={styles.image} />
                </View>

                <Text style={styles.name}>{item.name}</Text>

                <ScrollView>

                    <Text style={styles.label}>Place</Text>
                    <Text style={styles.text}>{item.place}</Text>

                    <Text style={styles.label}>Coordinates</Text>
                    <Text style={styles.text}>{item.coordinates[0]}° N, {item.coordinates[1]}° E</Text>

                    {
                        item.temperature && (
                            <>
                                <Text style={styles.label}>Temperature</Text>
                                {
                                    item.temperature.map((t, index) => (
                                        <View style={{width: '100%'}} key={index}>
                                            <Text style={[styles.text, index !== item.temperature.length - 1 && {marginBottom: 2}]}>{item.temperature.length > 1 && `  ${'\u2022'}`} {t}</Text>
                                        </View>
                                    ))
                                }
                            </>
                        )
                    }

                    {
                        item.sauna && (
                            <>
                                <Text style={styles.label}>Type of sauna</Text>
                                {
                                    item.sauna.map((t, index) => (
                                        <View style={{width: '100%'}} key={index}>
                                            <Text style={[styles.text, index !== item.sauna.length - 1 && {marginBottom: 2}]}>{item.sauna.length > 1 && `  ${'\u2022'}`} {t}</Text>
                                        </View>
                                    ))
                                }
                            </>
                        )
                    }

                    {
                        item.cost && (
                            <>
                                <Text style={styles.label}>Cost</Text>
                                {
                                    item.cost.map((t, index) => (
                                        <View style={{width: '100%'}} key={index}>
                                            <Text style={[styles.text, index !== item.cost.length - 1 && {marginBottom: 2}]}>{item.cost.length > 1 && `  ${'\u2022'}`} {t}</Text>
                                        </View>
                                    ))
                                }
                            </>
                        )
                    }

                    <Text style={styles.label}>Contacts</Text>
                    <Text style={styles.text}>{item.contacts}</Text>

                    <Text style={styles.label}>Hours</Text>
                    <Text style={styles.text}>{item.hours}</Text>

                    {
                        item.features && (
                            <>
                                <Text style={styles.label}>Features</Text>
                                {
                                    item.features.map((t, index) => (
                                        <View style={{width: '100%'}} key={index}>
                                            <Text style={[styles.text, index !== item.features.length - 1 && {marginBottom: 2}]}>{item.features.length > 1 && `  ${'\u2022'}`} {t}</Text>
                                        </View>
                                    ))
                                }
                            </>
                        )
                    }

                    {
                        item.services && (
                            <>
                                <Text style={styles.label}>Essential Services</Text>
                                {
                                    item.services.map((t, index) => (
                                        <View style={{width: '100%'}} key={index}>
                                            <Text style={[styles.text, index !== item.services.length - 1 && {marginBottom: 2}]}>{item.services.length > 1 && `  ${'\u2022'}`} {t}</Text>
                                        </View>
                                    ))
                                }
                            </>
                        )
                    }

                    {
                        item.additional && (
                            <>
                                <Text style={styles.label}>Additional Services</Text>
                                {
                                    item.additional.map((t, index) => (
                                        <View style={{width: '100%'}} key={index}>
                                            <Text style={[styles.text, index !== item.additional.length - 1 && {marginBottom: 2}]}>{item.additional.length > 1 && `  ${'\u2022'}`} {t}</Text>
                                        </View>
                                    ))
                                }
                            </>
                        )
                    }

                    <TouchableOpacity
                        style={styles.markBtn}
                        onPress={() => setStatusVisible(true)}
                    >
                        <Text style={styles.markBtnText}>Mark as</Text>
                    </TouchableOpacity>

                    <View style={{height: 100}} />

                </ScrollView>

                {
                    statusVisible && (
                        <Modal
                            animationType="slide"
                            transparent
                            visible={statusVisible}
                            onRequestClose={() => setStatusVisible(false)}
                        >
                            <View style={styles.filter}>

                                <TouchableOpacity
                                    style={{ position: 'absolute', top: 24, alignSelf: 'center' }}
                                    onPress={() => setStatusVisible(false)}
                                >
                                    <View style={styles.line} />
                                </TouchableOpacity>

                                <Text style={styles.subTitle}>Mark as</Text>

                                <TouchableOpacity
                                    style={[styles.markBtn, status === 'Planned' && {backgroundColor: '#fff'}]}
                                    onPress={() => updateStatus('Planned')}
                                >
                                    <Text style={[styles.markBtnText, status === 'Planned' && {color: '#a5855d'}]}>Planned</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.markBtn, {marginTop: 10}, status === 'Visited' && {backgroundColor: '#fff'}]}
                                    onPress={() => updateStatus('Visited')}
                                >
                                    <Text style={[styles.markBtnText, status === 'Visited' && {color: '#a5855d'}]}>Visited</Text>
                                </TouchableOpacity>

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
        flex: 1,
    },

    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },

    actionBtn: {
        width: 46,
        height: 46,
        borderRadius: 100,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    categoryContainer: {
        backgroundColor: '#a5855d',
        paddingVertical: 10,
        paddingHorizontal: 17,
        borderRadius: 100,
        position: 'absolute',
        top: 11,
        right: 9,
        zIndex: 10
    },

    category: {
        fontSize: 14,
        fontWeight: '900',
        color: '#fff',
    },

    image: {
        width: '100%',
        height: 258,
        resizeMode: 'cover',
        borderRadius: 33,
        marginBottom: 15
    },

    name: {
        fontSize: 25,
        fontWeight: '900',
        color: '#a5855d',
        textAlign: 'flex-start',
        marginBottom: 12
    },

    label: {
        fontSize: 14,
        fontWeight: '300',
        color: '#fff',
        textAlign: 'flex-start',
        marginBottom: 2,
        lineHeight: 22
    },

    text: {
        fontSize: 16,
        fontWeight: '900',
        color: '#fff',
        textAlign: 'flex-start',
        marginBottom: 12,
        lineHeight: 22
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

    markBtn: {
        width: '100%',
        padding: 15,
        borderRadius: 54,
        backgroundColor: '#a5855d',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },

    markBtnText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#fff'
    }

});

export default ReadCatalog;