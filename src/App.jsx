import {StatusBar} from 'expo-status-bar';
import Navigation from "./navigations/Navigation";
import {UserProvider} from "./contexts/UserContext";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";
import {FIREBASE_CONFIG} from '@env'

export default function App() {

    console.log(FIREBASE_CONFIG)

    return (
        <ActionSheetProvider>
            <UserProvider>
                <StatusBar style="dark"/>
                <Navigation/>
            </UserProvider>
        </ActionSheetProvider>
    );
}
