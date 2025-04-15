import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import SharedLayout from "./SharedLayout";

const { height } = Dimensions.get('window');

const ReadVacation = ({ route }) => {
    const { item } = route.params;
    const navigation = useNavigation();

    const deleteVacation = async () => {
        try {
            const updated = reminders.filter((r) => r.id !== item.id);
            await AsyncStorage.setItem('vacations', JSON.stringify(updated));
            navigation.goBack()
        } catch (error) {
            alert('Error deleting item');
        }
    };

    return (
        <SharedLayout back={'2'}>
            <View style={styles.container}>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/icons/back.png')} style={{width: 27, height: 24, resizeMode: 'contain'}} />
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={[styles.actionBtn, {backgroundColor: '#3300ff', marginRight: 12}]} onPress={() => navigation.navigate('AddVacation', {item})}>
                            <Image source={require('../assets/icons/edit.png')} style={{width: 28, height: 24, resizeMode: 'contain'}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionBtn, {backgroundColor: '#ff0000'}]} onPress={deleteVacation}>
                            <Image source={require('../assets/icons/delete.png')} style={{width: 28, height: 24, resizeMode: 'contain'}} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={{width: '100%'}}>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.category}>{item.status}</Text>
                    </View>
                    <Image source={{uri: item.image}} style={styles.image} />
                </View>

                <Text style={styles.name}>{item.name}</Text>

                <ScrollView style={{ width: '100%' }}>
                    
                    <Text style={styles.label}>Date of visit</Text>
                    <Text style={styles.text}>{item.date}</Text>

                    <Text style={styles.label}>Address</Text>
                    <Text style={styles.text}>{item.address}</Text>

                    {
                        item.impression && (
                            <>
                                <Text style={styles.label}>Personal impressions</Text>
                                <Text style={styles.text}>{item.impression}</Text>
                            </>
                        )
                    }

                    {
                        item.notes && (
                            <>
                                <Text style={styles.label}>Notes</Text>
                                <Text style={styles.text}>{item.notes}</Text>
                            </>
                        )
                    }

                    {
                        item.rating && (
                            <>
                                <Text style={styles.subTitle}>Service Rating</Text>
                                <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 24 }]}>
                                    {
                                        [1, 2, 3, 4, 5].map((star, index) => (
                                            <Image key={index} source={require('../assets/icons/star.png')} style={{width: '20%', height: height * 0.065, resizeMode: 'contain', tintColor: star <= item.rating.service ? '#fec10e' : '#7e7e7e'}} />
                                        ))
                                    }
                                </View>
    
                                <Text style={styles.subTitle}>Atmosphere Rating</Text>
                                <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 24 }]}>
                                    {
                                        [1, 2, 3, 4, 5].map((star, index) => (
                                            <Image key={index} source={require('../assets/icons/star.png')} style={{width: '20%', height: height * 0.065, resizeMode: 'contain', tintColor: star <= item.rating.atmosphere ? '#fec10e' : '#7e7e7e'}} />
                                        ))
                                    }
                                </View>
    
                                <Text style={styles.subTitle}>Quality of Procedures Rating</Text>
                                <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 24 }]}>
                                    {
                                        [1, 2, 3, 4, 5].map((star, index) => (
                                            <Image key={index} source={require('../assets/icons/star.png')} style={{width: '20%', height: height * 0.065, resizeMode: 'contain', tintColor: star <= item.rating.quality ? '#fec10e' : '#7e7e7e'}} />
                                        ))
                                    }
                                </View>
                            </>
                        )
                    }
                    
                </ScrollView>

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

    subTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#fff',
        lineHeight: 22,
        marginBottom: 5
    },

});

export default ReadVacation;