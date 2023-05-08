import React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import {useUserState} from "../context/UserContext";

const ProfilesScreen = () => {
    const [, setUser] = useUserState()

    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <Button title={'로그아웃'} onPress={() => setUser({})}/>
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
