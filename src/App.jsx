import {StatusBar} from 'expo-status-bar';
import Navigation from "./navigations/Navigation";
import ReducerTest from "./ReducerTest";
import {LogBox} from "react-native";

export default function App() {
    LogBox.ignoreLogs([
        'AsyncStorage has been extracted from react-native core'
    ])

    return (
        <>
            <StatusBar style="dark"/>
            <Navigation/>
        </>
    );
}
