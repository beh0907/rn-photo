import React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import {useUserState} from "../context/UserContext";
import {signOut} from "../api/Auth";

const ProfilesScreen = () => {
    const [, setUser] = useUserState()

    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <Button title={'로그아웃'} onPress={async () => {
                await signOut()
                setUser({})
            }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default ProfilesScreen;
