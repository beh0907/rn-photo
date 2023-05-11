import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MainRoutes} from "./Routes";
import {WHITE} from "../colors";
import ContentTab from "./ContentTab";
import SelectPhotosScreen from "../screens/SelectPhotosScreen";
import UpdateProfilesScreen from "../screens/UpdateProfilesScreen";
import HeaderLeft from "../components/HeaderLeft";
import ImagePickerScreen from "../screens/ImagePickerScreen";
import WriteTextScreen from "../screens/WriteTextScreen";

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            contentStyle: {backgroundColor: WHITE},
            title: '',
            headerLeft: HeaderLeft,
        }}>
            <Stack.Screen name={MainRoutes.CONTENT_TAB} component={ContentTab} options={{headerShown: false}}/>
            <Stack.Screen name={MainRoutes.SELECT_PHOTOS} component={SelectPhotosScreen}/>
            <Stack.Screen name={MainRoutes.UPDATE_PHOTOS} component={UpdateProfilesScreen}/>
            <Stack.Screen name={MainRoutes.IMAGE_PICKER} component={ImagePickerScreen}/>
            <Stack.Screen name={MainRoutes.WRITE_TEXT} component={WriteTextScreen}/>
        </Stack.Navigator>
    );
};

export default MainStack;
