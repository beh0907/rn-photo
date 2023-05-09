import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {Alert, Button, Image, Keyboard, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {useUserState} from "../context/UserContext";
import {signOut, updateUserInfo} from "../api/Auth";
import {GRAY, WHITE} from "../colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import FastImage from "../components/FastImage";
import {useNavigation} from "@react-navigation/native";
import SafeInputView from "../components/SafeInputView";
import HeaderRight from "../components/HeaderRight";

const UpdateProfilesScreen = () => {
    const navigation = useNavigation()
    const [user, setUser] = useUserState()

    const [displayName, setDisplayName] = useState(user.displayName)
    const [disabled, setDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(async () => {
        Keyboard.dismiss()

        if (!isLoading) {
            setIsLoading(true)

            try {
                const userInfo = {displayName}

                await updateUserInfo(userInfo)
                setUser(prev => ({...prev, ...userInfo}))

                navigation.goBack()
            } catch (e) {
                Alert.alert('유저 정보 수정 실패', e.message)
                setIsLoading(false)
            }

        }
    }, [disabled, displayName, navigation, setUser])

    useEffect(() => {
        setDisabled(!displayName || isLoading)
    }, [displayName, isLoading])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight onPress={onSubmit} disabled={disabled}/>
        })
    }, [navigation, disabled, onSubmit])

    return (
        <SafeInputView>
            <View style={styles.container}>
                <View style={[styles.photo, user.photoURL || {backgroundColor: GRAY.DEFAULT}]}>
                    <FastImage source={{uri: user.photoURL}} style={styles.photo}/>
                    <Pressable style={styles.imageButton} onPress={() => console.log('TOUCH')}>
                        <MaterialCommunityIcons name='image' size={20} color={WHITE}/>
                    </Pressable>
                </View>

                <View>
                    <TextInput value={displayName} style={styles.input} placeholder={'NickName'}
                               onChangeText={text => {setDisplayName(text.trim())}}
                               textAlign={'center'} maxLength={10} returnKeyType={'done'} autoCapitalize={'none'}
                               autoCorrect={false} textContentType={'none'}/>
                </View>
            </View>
        </SafeInputView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
    },
    photo: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    imageButton: {
        position: 'absolute',
        bottom: 0,
        right: 20,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GRAY.DARK,
    },
    input: {
        marginTop: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        width: 200,
        fontSize: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: GRAY.DEFAULT,
    },
})


export default UpdateProfilesScreen;
