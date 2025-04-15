import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, TextInput, ScrollView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SharedLayout from "./SharedLayout"

const { width } = Dimensions.get('window');

const AddReminder = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState(null);
    const [date, setDate] = useState(new Date());

    const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;
    
    const handleAddReminder = async () => {
        try {
            const newReminder = {
                id: Date.now(),
                title,
                date: formattedDate,
            };

            const storedReminders = await AsyncStorage.getItem('reminders');
            const reminders = storedReminders ? JSON.parse(storedReminders) : [];

            const updatedReminders = [...reminders, newReminder];

            await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));

            navigation.goBack();
        } catch (error) {
            alert('Error saving your reminder');
        }
    };

    return (
        <SharedLayout back={'2'}>
            <View style={styles.container}>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/icons/back.png')} style={{width: 27, height: 24, resizeMode: 'contain'}} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Add a reminder</Text>
                </View>

                <Image source={require('../assets/decor/vacation.png')} style={styles.decor} />

                <ScrollView style={{width: '100%'}}>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    <Text style={[styles.label, {color: '#fff', marginVertical: 5, alignSelf: 'flex-start'}]}>Date</Text>

                    <View style={styles.inputContainer}>
                        <DateTimePicker 
                            value={date} 
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

                    <View style={{height: 120}} />
                </ScrollView>

                <TouchableOpacity
                    style={[styles.btn, (!date || !title) && { backgroundColor: '#696969' }]}
                    disabled={!date || !title}
                    onPress={handleAddReminder}
                >
                    <Text style={[styles.btnText,(!date || !title) && { color: 'rgba(255, 255, 255, 0.25)' }]}>Done</Text>
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
        marginRight: width * 0.13
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
    }

});

export default AddReminder;