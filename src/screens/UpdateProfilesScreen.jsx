import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {Alert, Keyboard, Platform, Pressable, StyleSheet, TextInput, View} from "react-native";
import {useUserState} from "../context/UserContext";
import {updateUserInfo} from "../api/Auth";
import {GRAY, WHITE} from "../colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import FastImage from "../components/FastImage";
import {useNavigation, useRoute} from "@react-navigation/native";
import SafeInputView from "../components/SafeInputView";
import HeaderRight from "../components/HeaderRight";
import {MainRoutes} from "../navigations/Routes";
import {getLocalUri} from "../components/ImagePicker";
import {uploadPhoto} from "../api/Storage";

const UpdateProfilesScreen = () => {
    const navigation = useNavigation()
    const {params} = useRoute()
    const [user, setUser] = useUserState()

    const [photo, setPhoto] = useState({uri: user.photoURL})
    console.log(photo.uri)

    const [displayName, setDisplayName] = useState(user.displayName)
    const [disabled, setDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (params) {
            const {selectedPhotos} = params


            if (selectedPhotos?.length) {
                //다중 선택 시 일단 가장 첫번째 이미지를 적용한다
                setPhoto(selectedPhotos[0])
                console.log(photo.uri)
            }
        }
    }, [params])

    const onSubmit = useCallback(async () => {
        Keyboard.dismiss()

        if (!isLoading) {
            setIsLoading(true)

            try {
                const localUri = Platform.select({
                    ios: await getLocalUri(photo.id),
                    android: photo.uri
                })

                const photoURL = await uploadPhoto({
                    uri: localUri,
                    uid: user.uid
                })

                const userInfo = {displayName, photoURL}

                await updateUserInfo(userInfo)
                setUser(prev => ({...prev, ...userInfo}))

                navigation.goBack()
            } catch (e) {
                Alert.alert('유저 정보 수정 실패', e.message)
                setIsLoading(false)
            }

        }
    }, [disabled, displayName, navigation, setUser, photo.id, photo.uri, user.uid])

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
                    <FastImage source={{uri: photo.uri}} style={styles.photo}/>
                    <Pressable style={styles.imageButton} onPress={() => navigation.navigate(MainRoutes.IMAGE_PICKER)}>
                        <MaterialCommunityIcons name='image' size={20} color={WHITE}/>
                    </Pressable>
                </View>

                <View>
                    <TextInput value={displayName} style={styles.input} placeholder={'NickName'}
                               onChangeText={text => {
                                   setDisplayName(text.trim())
                               }}
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
