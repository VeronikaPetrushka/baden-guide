import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Animated, PanResponder } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import SharedLayout from "./SharedLayout"

const VacationTracker = () => {
    const navigation = useNavigation();
    const [vacations, setVacations] = useState([]);
    const [reminders, setReminders] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadVacations();
            loadReminders();
        }, [])
    );

    useEffect(() => {
        loadVacations();
    }, [vacations]);

    useEffect(() => {
        loadReminders();
    }, [reminders])

    const loadVacations = async () => {
        try {
            const storedVacations = await AsyncStorage.getItem('vacations');
            storedVacations ? setVacations(JSON.parse(storedVacations)) : []
        } catch (error) {
            alert('Error loading vacations:', error);
        }
    };

    const loadReminders = async () => {
        try {
            const storedReminders = await AsyncStorage.getItem('reminders');
            storedReminders ? setReminders(JSON.parse(storedReminders)) : []
        } catch (error) {
            alert('Error loading reminders:', error);
        }
    };

    const deleteReminder = async (item) => {
        try {
            const updated = reminders.filter((r) => r.id !== item.id);
            await AsyncStorage.setItem('reminders', JSON.stringify(updated));
            setReminders(updated);
        } catch (error) {
            alert('Error deleting item');
        }
    };

    const visited = vacations.filter((v) => v.status === 'Visited');
    const planned = vacations.filter((v) => v.status === 'I plan to visit');

    return (
        <SharedLayout menu={true} back={'1'}>
            <View style={styles.container}>

                <Text style={styles.title}>Personal vacation tracker</Text>

                <Image source={require('../assets/decor/vacation.png')} style={styles.image} />

                <ScrollView style={{ width: '100%' }}>
                    <Text style={styles.label}>Visited</Text>
                    {
                        visited.length > 0 ? (
                            <View style={{width: '100%'}}>
                                {
                                    visited.map((item, index) => (
                                        <View key={index} style={styles.card}>
                                            <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('ReadVacation', { item })}>
                                                <Image source={require('../assets/icons/navigate.png')} style={{width: 28, height: 24, resizeMode: 'contain'}} />
                                            </TouchableOpacity>
                                            <Text style={styles.cardName} ellipsizeMode='tail'>{item.name}</Text>
                                            <Text style={styles.cardDate}>{item.date}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        ) : (
                            <View style={styles.nothingContainer}>
                                <Text style={styles.nothingText}>There's nothing here yet</Text>
                            </View>
                        )
                    }
                    <TouchableOpacity
                        style={styles.markBtn}
                        onPress={() => navigation.navigate('AddVacation')}
                    >
                        <Text style={styles.markBtnText}>Add</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>I plan to visit</Text>
                    {
                        planned.length > 0 ? (
                            <View style={{width: '100%'}}>
                                {
                                    planned.map((item, index) => (
                                        <View key={index} style={styles.card}>
                                            <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('ReadVacation', { item })}>
                                                <Image source={require('../assets/icons/navigate.png')} style={{width: 28, height: 24, resizeMode: 'contain'}} />
                                            </TouchableOpacity>
                                            <Text style={styles.cardName} ellipsizeMode='tail'>{item.name}</Text>
                                            <Text style={styles.cardDate}>{item.date}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        ) : (
                            <View style={styles.nothingContainer}>
                                <Text style={styles.nothingText}>There's nothing here yet</Text>
                            </View>
                        )
                    }
                    <TouchableOpacity
                        style={styles.markBtn}
                        onPress={() => navigation.navigate('AddVacation')}
                    >
                        <Text style={styles.markBtnText}>Add</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>Reminder</Text>
                    {
                        reminders.length > 0 ? (
                            <View style={{width: '100%'}}>
                                {
                                    reminders.map((item, index) => (
                                        <View key={index} style={styles.card}>
                                            <TouchableOpacity style={[styles.actionBtn, {backgroundColor: '#ff0000'}]} onPress={() => deleteReminder(item)}>
                                                <Image source={require('../assets/icons/delete.png')} style={{width: 28, height: 24, resizeMode: 'contain'}} />
                                            </TouchableOpacity>
                                            <Text style={styles.cardName} ellipsizeMode='tail'>{item.title}</Text>
                                            <Text style={styles.cardDate}>{item.date}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        ) : (
                            <View style={styles.nothingContainer}>
                                <Text style={styles.nothingText}>There's nothing here yet</Text>
                            </View>
                        )
                    }
                    <TouchableOpacity
                        style={styles.markBtn}
                        onPress={() => navigation.navigate('AddReminder')}
                    >
                        <Text style={styles.markBtnText}>Add</Text>
                    </TouchableOpacity>

                    <View style={{height: 120}} />
                </ScrollView>

            </View>
        </SharedLayout>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    title: {
        fontSize: 25,
        fontWeight: '900',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 13
    },

    image: {
        width: 295,
        height: 156,
        resizeMode: 'contain',
        marginBottom: 12,
        alignSelf: 'center'
    },

    markBtn: {
        width: '100%',
        padding: 15,
        borderRadius: 54,
        backgroundColor: '#a5855d',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24
    },

    markBtnText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#fff'
    },

    actionBtn: {
        width: 46,
        height: 46,
        borderRadius: 100,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 5,
        right: 5
    },

    label: {
        fontSize: 17,
        fontWeight: '700',
        color: '#fff',
        lineHeight: 22,
        marginBottom: 5,
        alignSelf: 'flex-start'
    },

    nothingContainer: {
        width: '100%',
        padding: 18,
        backgroundColor: '#2d2d2d',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },

    nothingText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#fff',
        lineHeight: 22,
    },

    card: {
        width: '100%',
        paddingVertical: 18,
        paddingHorizontal: 10,
        backgroundColor: '#2d2d2d',
        borderRadius: 23,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 5
    },

    cardName: {
        width: '80%',
        fontSize: 17,
        fontWeight: '700',
        color: '#fff',
        lineHeight: 22,
        marginBottom: 10
    },

    cardDate: {
        fontSize: 13,
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.5)',
        lineHeight: 22,
    }


});

export default VacationTracker;