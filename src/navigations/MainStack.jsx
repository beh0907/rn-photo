import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MainRoutes} from "./Routes";
import {WHITE} from "../colors";
import ContentTab from "./ContentTab";
import SelectPhotosScreen from "../screens/SelectPhotosScreen";

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            contentStyle: {backgroundColor: WHITE},
            headerShown: false
        }}>
            <Stack.Screen name={MainRoutes.CONTENT_TAB} component={ContentTab}/>
            <Stack.Screen name={MainRoutes.SELECT_PHOTOS} component={SelectPhotosScreen}/>
        </Stack.Navigator>
    );
};

export default MainStack;
