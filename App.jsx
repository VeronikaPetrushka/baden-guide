import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from './src/routes/Splash';
import Catalog from './src/routes/Catalog';
import ReadCatalog from './src/routes/ReadCatalog';
import VacationTracker from './src/routes/VacationTracker';
import AddVacation from './src/routes/AddVacation';
import AddReminder from './src/routes/AddReminder';
import ReadVacation from './src/routes/ReadVacation';
import SpaGame from './src/routes/SpaGame';
import AppSettings from './src/routes/AppSettings';

enableScreens();

const Stack = createStackNavigator();

const App = () => {

  return (
      <NavigationContainer>
            <Stack.Navigator initialRouteName={"Splash"}>    
                  <Stack.Screen 
                        name="Splash" 
                        component={Splash} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="Catalog" 
                        component={Catalog} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="ReadCatalog" 
                        component={ReadCatalog} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="VacationTracker" 
                        component={VacationTracker} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="AddVacation" 
                        component={AddVacation} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="AddReminder" 
                        component={AddReminder} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="ReadVacation" 
                        component={ReadVacation} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="SpaGame" 
                        component={SpaGame} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="AppSettings" 
                        component={AppSettings} 
                        options={{ headerShown: false }} 
                  />
            </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
