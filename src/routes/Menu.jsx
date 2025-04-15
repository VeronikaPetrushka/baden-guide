import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Menu = () => {
    const navigation = useNavigation();
    const [currentRoute, setCurrentRoute] = useState('Catalog');

    const currentScreen = (screen) => {
        setCurrentRoute(screen);
        navigation.navigate(screen)
    };    

    useEffect(() => {
        const unfollow = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setCurrentRoute(currentRoute);
        });

        return unfollow;
    }, [navigation]);

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.btn} onPress={() => currentScreen('Catalog')}>
                {currentRoute==='Catalog' && <View style={styles.line} /> }
                <Image source={require('../assets/menu/catalog.png')} style={[styles.icon, currentRoute==='Catalog' && {tintColor: '#fff'}]} />
                <Text style={[styles.btnText, currentRoute==='Catalog' && {color: '#fff'}]}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => currentScreen('VacationTracker')}>
                {currentRoute==='VacationTracker' && <View style={styles.line} /> }
                <Image source={require('../assets/menu/vacation.png')} style={[styles.icon, currentRoute==='VacationTracker' && {tintColor: '#fff'}]} />
                <Text style={[styles.btnText, currentRoute==='VacationTracker' && {color: '#fff'}]}>My vacation</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => currentScreen('SpaGame')}>
                {currentRoute==='SpaGame' && <View style={styles.line} /> }
                <Image source={require('../assets/menu/quiz.png')} style={[styles.icon, currentRoute==='SpaGame' && {tintColor: '#fff'}]} />
                <Text style={[styles.btnText, currentRoute==='SpaGame' && {color: '#fff'}]}>Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => currentScreen('AppSettings')}>
                {currentRoute==='AppSettings' && <View style={styles.line} /> }
                <Image source={require('../assets/menu/settings.png')} style={[styles.icon, currentRoute==='AppSettings' && {tintColor: '#fff'}]} />
                <Text style={[styles.btnText, currentRoute==='AppSettings' && {color: '#fff'}]}>Settings</Text>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        width: '90%',
        backgroundColor: '#2d2d2d',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 54,
        paddingVertical: 3
    },

    line: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 2,
        position: 'absolute',
        top: 2
    },

    btn: {
        width: '24%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 7.5
    },

    icon: {
        width: 24,
        height: 24,
        marginBottom: 6
    },

    btnText: {
        fontSize: 11,
        fontWeight: '500',
        color: '#a5855d'
    }


})

export default Menu;
