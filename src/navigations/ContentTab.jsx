import React from 'react';
import {AuthRoutes, ContentRoutes} from "./Routes";
import ProfilesScreen from "../screens/ProfilesScreen";
import HomeScreen from "../screens/HomeScreen";
import ListScreen from "../screens/ListScreen";
import MapScreen from "../screens/MapScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {GRAY, PRIMARY} from "../colors";
import TabBarAddButton from "../components/TabBarAddButton";

const Tab = createBottomTabNavigator()

const getTabBarIcon = ({focused, color, size, name}) => {
    const iconName = focused ? name : `${name}-outline`
    return <MaterialCommunityIcons name={iconName} size={size} color={color}/>
}

const AddButtonScreen = () => null

const ContentTab = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: PRIMARY.DARK,
            tabBarInactiveTintColor: GRAY.DARK,
            tabBarShowLabel: false
        }}>
            <Tab.Screen name={ContentRoutes.HOME} component={HomeScreen}
                        options={{
                            tabBarIcon: (props) => getTabBarIcon({...props, name: 'home'}),
                            tabBarLabel: '홈'
                        }}/>
            <Tab.Screen name={ContentRoutes.LIST} component={ListScreen}
                        options={{
                            tabBarIcon: (props) => getTabBarIcon({...props, name: 'post'}),
                            tabBarLabel: '목록'
                        }}/>

            <Tab.Screen name={'AddButton'} component={AddButtonScreen}
                        options={{tabBarButton: () => <TabBarAddButton/>}}/>

            <Tab.Screen name={ContentRoutes.MAP} component={MapScreen}
                        options={{
                            tabBarIcon: (props) => getTabBarIcon({...props, name: 'map'}),
                            tabBarLabel: '지도'
                        }}/>
            <Tab.Screen name={ContentRoutes.PROFILE} component={ProfilesScreen}
                        options={{
                            tabBarIcon: (props) => getTabBarIcon({...props, name: 'account'}),
                            tabBarLabel: '프로필'
                        }}/>
        </Tab.Navigator>
    );
};

export default ContentTab;
