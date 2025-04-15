import { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SharedLayout from "./SharedLayout"

const Splash = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        const timeout = setTimeout(() => {
            navigation.navigate('Catalog');
        }, 2500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <SharedLayout back={'1'}>
            <View style={styles.container}>
                <Animated.Image 
                    source={require('../assets/decor/logo.png')} 
                    style={[{ width: 302, height: 180, opacity: fadeAnim }]}
                />
            </View>
        </SharedLayout>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }

});

export default Splash;