import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Switch, Linking, Alert } from "react-native";
import SharedLayout from "./SharedLayout"

const AppSettings = () => {
    const [reminder, setReminder] = useState(true);

    const browseTerms = () => {
        const url = 'privacy-link';

        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert('Error', 'Unable to open terms of use');
                }
            })
            .catch(() => Alert.alert('Error', 'Something went wrong'));
    };

    return (
        <SharedLayout menu={true} back={'1'}>
            <View style={styles.container}>

                <Text style={styles.title}>Settings</Text>

                <Image source={require('../assets/decor/vacation.png')} style={styles.decor} />

                <View style={styles.btnContainer}>
                    <View style={[styles.btn, {borderBottomColor: '#fff', borderBottomWidth: 0.33}]}>
                        <Text style={styles.btnText}>Reminder</Text>
                        <Switch value={reminder} onValueChange={() => setReminder((prev) => !prev)} thumbColor="#fff" trackColor={{ false: "#696969", true: "#34c759" }} />
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={browseTerms}>
                        <Text style={styles.btnText}>Terms of use</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SharedLayout>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center'
    },

    title: {
        fontSize: 25,
        fontWeight: '900',
        color: '#a5855d',
        textAlign: 'center',
        marginBottom: 10
    },

    decor: {
        width: 295,
        height: 156,
        resizeMode: 'contain',
        marginBottom: 12,
        alignSelf: 'center'
    },

    btnContainer: {
        width: '100%',
        borderRadius: 24,
        backgroundColor: '#2d2d2d'
    },

    btn: {
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    btnText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#fff'
    }

});

export default AppSettings;