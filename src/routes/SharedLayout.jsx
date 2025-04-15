import { View, Dimensions, ImageBackground } from 'react-native';
import Menu from './Menu';

const { height } = Dimensions.get('window');

const SharedLayout = ({ children, menu, back }) => {
    const image = back === '1' ? require('../assets/backgrounds/1.png') : require('../assets/backgrounds/2.png');
    
    return (
        <ImageBackground source={image} style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingTop: height * 0.08, paddingHorizontal: 20 }}>
                {children}
            </View>
            {
                menu && (
                    <View style={{ width: '100%', position: 'absolute', bottom: 35, zIndex: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Menu />
                    </View>
                )
            }
        </ImageBackground>
    )
};

export default SharedLayout;