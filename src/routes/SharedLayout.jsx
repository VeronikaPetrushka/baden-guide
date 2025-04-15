import { View, Dimensions } from 'react-native';
import Menu from './Menu';

const { height } = Dimensions.get('window');

const SharedLayout = ({ children, menu }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#000', paddingTop: height * 0.08, paddingHorizontal: 20 }}>
                {children}
            </View>
            {
                menu && (
                    <View style={{ width: '100%', position: 'absolute', bottom: 35, zIndex: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Menu />
                    </View>
                )
            }
        </View>
    )
};

export default SharedLayout;