import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, TextInput, ScrollView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import SharedLayout from "./SharedLayout"

const { width, height } = Dimensions.get('window');

const AddVacation = ({ route }) => {
    const { item } = route.params || {};
    const navigation = useNavigation();

    const [step, setStep] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(item?.status || null);
    const [image, setImage] = useState(item?.image || null);
    const [name, setName] = useState(item?.name || null);
    const [address, setAddress] = useState(item?.address || null);
    const [impression, setImpression] = useState(item?.impression || null);
    const [notes, setNotes] = useState(item?.notes || null);
    const [rating, setRating] = useState(item?.ratings || {service: null, atmosphere: null, quality: null})

    const nextStep = () => {
        if (selectedCategory === 'Visited') {
            if (step < 2) {
                setStep((prev) => prev + 1)
            } else {
                handleAddVacation();
            }
        } else {
            if (step < 1) {
                setStep((prev) => prev + 1)
            } else {
                handleAddVacation();
            }
        }
    };

    const uploadVacationImage = async () => {
        try {
            const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
            if (!result.didCancel && result.assets && result.assets.length > 0) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            alert("Error uploading your vacation image");
        }
    };

    const parseDate = (date) => {
        if (typeof date === 'string') {
            const dateObject = new Date(date);
            return isNaN(dateObject.getTime()) ? new Date(date.split('.').reverse().join('-')) : dateObject;
        }
        return new Date(date);
    };

    const [date, setDate] = useState(item && parseDate(item?.date) || new Date());

    const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;
    
    const handleAddVacation = async () => {
        try {
            const storedVacations = await AsyncStorage.getItem('vacations');
            const vacations = storedVacations ? JSON.parse(storedVacations) : [];

            const newVacation = {
                id: item?.id || Date.now(),
                status: selectedCategory,
                image: image,
                name: name,
                address: address,
                date: formattedDate,
                notes: notes,
                ...(selectedCategory === 'Visited' && {
                    impression: impression,
                    rating: rating,
                })
            };

            let updatedVacations;

            if (item?.id) {
                updatedVacations = vacations.map((v) =>
                    v.id === item.id ? newVacation : v
                );
            } else {
                updatedVacations = [...vacations, newVacation];
            }

            await AsyncStorage.setItem('vacations', JSON.stringify(updatedVacations));
            navigation.navigate('VacationTracker');
        } catch (error) {
            alert('Error saving your vacation');
        }
    };
    
    return (
        <SharedLayout back={'2'}>
            <View style={styles.container}>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/icons/back.png')} style={{width: 27, height: 24, resizeMode: 'contain'}} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Add a place</Text>
                </View>

                {
                    step === 0 && (
                        <>
                            <Image source={require('../assets/decor/vacation.png')} style={styles.decor} />
                            {
                                ['I plan to visit', 'Visited'].map((status, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.categoryBtn, selectedCategory === status && { backgroundColor: '#a5855d' }]}
                                        onPress={() => setSelectedCategory(status)}
                                    >
                                        <Text style={[styles.categoryBtnText, selectedCategory === status && { color: '#fff' }]}>{status}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </>
                    )
                }

                {
                    step === 1 && (
                        <ScrollView style={{width: '100%'}}>
                            <TouchableOpacity style={styles.uploadBtn} onPress={uploadVacationImage}>
                                {
                                    image ? (
                                        <Image source={{uri: image}} style={{width: '100%', height: '100%', resizeMode: 'cover'}} />
                                    ) : (
                                        <Image source={require('../assets/decor/image.png')} style={{width: 71, height: 73, resizeMode: 'contain', alignSelf: 'center'}} />
                                    )
                                }
                            </TouchableOpacity>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Place name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Place address</Text>
                                <TextInput
                                    style={styles.input}
                                    value={address}
                                    onChangeText={setAddress}
                                />
                            </View>

                            <Text style={[styles.label, {color: '#fff', marginVertical: 5, alignSelf: 'flex-start'}]}>Date of Visit</Text>

                            <View style={styles.inputContainer}>
                                <DateTimePicker 
                                    value={item ? new Date(date) : date} 
                                    mode="date" 
                                    display="spinner" 
                                    themeVariant="dark"
                                    onChange={(event, selectedDate) => {
                                        if (selectedDate) {
                                        setDate(selectedDate);
                                        }
                                    }}
                                    style={{alignSelf: 'center'}}
                                />
                            </View>
                            
                            {
                                selectedCategory === 'Visited' && (
                                    <View style={[styles.inputContainer, {minHeight: 128}]}>
                                        <Text style={styles.label}>Personal impressions</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={impression}
                                            onChangeText={setImpression}
                                            multiline
                                        />
                                    </View>
                                )
                            }

                            <View style={[styles.inputContainer, {minHeight: 128}]}>
                                <Text style={styles.label}>Notes</Text>
                                <TextInput
                                    style={styles.input}
                                    value={notes}
                                    onChangeText={setNotes}
                                    multiline
                                />
                            </View>

                            <View style={{height: 120}} />
                        </ScrollView>
                    )
                }

                {
                    step === 2 && (
                        <ScrollView style={{ width: '100%' }}>
                            
                            <Text style={styles.subTitle}>Service Rating</Text>
                            <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 24 }]}>
                                {
                                    [1, 2, 3, 4, 5].map((star, index) => (
                                        <TouchableOpacity key={index} onPress={() => setRating((prev) => ({ ...prev, service: star }))}>
                                            <Image source={require('../assets/icons/star.png')} style={{width: '20%', height: height * 0.065, resizeMode: 'contain', tintColor: star <= rating.service ? '#fec10e' : '#7e7e7e'}} />
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>

                            <Text style={styles.subTitle}>Atmosphere Rating</Text>
                            <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 24 }]}>
                                {
                                    [1, 2, 3, 4, 5].map((star, index) => (
                                        <TouchableOpacity key={index} onPress={() => setRating((prev) => ({ ...prev, atmosphere: star }))}>
                                            <Image source={require('../assets/icons/star.png')} style={{width: '20%', height: height * 0.065, resizeMode: 'contain', tintColor: star <= rating.atmosphere ? '#fec10e' : '#7e7e7e'}} />
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>

                            <Text style={styles.subTitle}>Quality of Procedures Rating</Text>
                            <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 24 }]}>
                                {
                                    [1, 2, 3, 4, 5].map((star, index) => (
                                        <TouchableOpacity key={index} onPress={() => setRating((prev) => ({ ...prev, quality: star }))}>
                                            <Image source={require('../assets/icons/star.png')} style={{width: '20%', height: height * 0.065, resizeMode: 'contain', tintColor: star <= rating.quality ? '#fec10e' : '#7e7e7e'}} />
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>

                            <View style={{height: 120}} />
                        </ScrollView>
                    )
                }

                <TouchableOpacity
                    style={[styles.btn,
                        (step === 0 && !selectedCategory) && { backgroundColor: '#696969' },
                        (step === 1 && (!name || !address || !date)) && { backgroundColor: '#696969' },
                    ]}
                    disabled={(step === 0 && !selectedCategory) || (step === 1 && (!name || !address || !date))}
                    onPress={nextStep}
                >
                    <Text
                        style={[styles.btnText,
                            (step === 0 && !selectedCategory) && { color: 'rgba(255, 255, 255, 0.25)' },
                            (step === 1 && (!name || !address || !date)) && { color: 'rgba(255, 255, 255, 0.25)' }
                        ]}>
                        Next
                    </Text>
                </TouchableOpacity>

            </View>
        </SharedLayout>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center'
    },

    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 43
    },

    actionBtn: {
        width: 46,
        height: 46,
        borderRadius: 100,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: width * 0.17
    },

    title: {
        fontSize: 25,
        fontWeight: '900',
        color: '#fff',
    },

    decor: {
        width: 295,
        height: 156,
        resizeMode: 'contain',
        marginBottom: 12,
        alignSelf: 'center'
    },

    categoryBtn: {
        width: '100%',
        padding: 19,
        borderRadius: 13,
        backgroundColor: '#2d2d2d',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2
    },

    categoryBtnText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#fff'
    },

    btn: {
        width: '100%',
        padding: 15,
        borderRadius: 54,
        backgroundColor: '#a5855d',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        position: 'absolute',
        bottom: 35,
        alignSelf: 'center'
    },

    btnText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#fff'
    },

    uploadBtn: {
        width: 150,
        height: 150,
        borderRadius: 300,
        backgroundColor: '#2d2d2d',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginBottom: 8,
        alignSelf: 'center'
    },

    inputContainer: {
        width: '100%',
        paddingVertical: 19,
        paddingHorizontal: 15,
        borderRadius: 13,
        backgroundColor: '#2d2d2d',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: 2
    },

    label: {
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 22,
        color: 'rgba(255, 255, 255, 0.3)',
    },

    input: {
        padding: 0,
        width: '100%',
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 22,
    },

    subTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#fff',
        lineHeight: 22,
        marginBottom: 5
    },

});

export default AddVacation;