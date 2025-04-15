import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import SharedLayout from "./SharedLayout"

const { height } = Dimensions.get('window');

const SpaGame = () => {
    return (
        <SharedLayout menu={true}>
            <View style={styles.container}>

            </View>
        </SharedLayout>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center'
    }

});

export default SpaGame;