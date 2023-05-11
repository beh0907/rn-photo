import {StatusBar} from 'expo-status-bar';
import Navigation from "./navigations/Navigation";
import {LogBox} from "react-native";
import {UserProvider} from "./contexts/UserContext";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";

export default function App() {
    LogBox.ignoreLogs([
        'AsyncStorage has been extracted from react-native core'
    ])

    return (
        <ActionSheetProvider>
            <UserProvider>
                <StatusBar style="dark"/>
                <Navigation/>
            </UserProvider>
        </ActionSheetProvider>
    );
}
