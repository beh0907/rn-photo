import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthRoutes} from "./Routes";
import {WHITE} from "../colors";
import ProfilesScreen from "../screens/ProfilesScreen";

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{contentStyle: {backgroundColor: WHITE}}}>
            <Stack.Screen name={AuthRoutes.PROFILE} component={ProfilesScreen}/>
        </Stack.Navigator>
    );
};

export default MainStack;
