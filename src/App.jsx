import {StatusBar} from 'expo-status-bar';
import Navigation from "./navigations/Navigation";
import {LogBox} from "react-native";
import {UserProvider} from "./context/UserContext";

export default function App() {
    LogBox.ignoreLogs([
        'AsyncStorage has been extracted from react-native core'
    ])

    return (
        <UserProvider>
            <StatusBar style="dark"/>
            <Navigation/>
        </UserProvider>
    );
}
