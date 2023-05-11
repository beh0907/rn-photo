import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, useWindowDimensions, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import HeaderRight from "../components/HeaderRight";
import {GRAY, PRIMARY, WHITE} from "../colors";
import FastImage from "../components/FastImage";
import LocationSearch from "../components/LocationSearch";
import {useUserState} from "../contexts/UserContext";
import {uploadPhoto} from "../api/Storage";
import {createPost} from "../api/post";

const MAX_TEXT_LENGTH = 50

const WriteTextScreen = () => {
    const navigation = useNavigation()
    const {params} = useRoute()
    const width = useWindowDimensions().width / 4

    const [photoUris, setPhotoUris] = useState([])
    const [text, setText] = useState('')

    const [disabled, setDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [location, setLocation] = useState('')
    const [user] = useUserState()

    useEffect(() => {
        if (params) setPhotoUris(params.photoUris ?? [])
    }, [params])

    useEffect(() => {
        setDisabled((isLoading || !text || !location))
    }, [isLoading, text, location])

    const onSubmit = useCallback(async () => {
        setIsLoading(true)

        try {
            const photos = await Promise.all(photoUris.map(uri => uploadPhoto({uri, uid: user.uid})))

            //게시글 작성
            await createPost({photos, location, text, user})

            //작성이 완료됐다면 이전 페이지로 이동
            //이미지를 선택하는 화면에서 navigate가 아닌 replace를 썼기 때문에 탭 메뉴로 이동
            navigation.goBack()
        } catch (e) {
            Alert.alert('글 작성 실패', e.message);
            setIsLoading(false)
        }

    }, [photoUris, user, location, text, navigation])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight disabled={disabled} onPress={onSubmit}/>,
        });
    }, [navigation, disabled, onSubmit]);

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                {photoUris.map((uri, idx) => (
                    <FastImage key={idx} source={{uri}} style={{width, height: width}}/>
                ))}
            </View>

            <LocationSearch onPress={({description}) => setLocation(description)} isLoading={isLoading}
                            isSelected={!!location}/>

            <View>
                <TextInput value={text} onChangeText={(text) => setText(text)} maxLength={MAX_TEXT_LENGTH}
                           placeholder={"사진의 설명을 작성해주세요"} style={styles.input} multiline={true}
                           returnKeyType={"done"} autoCapitalize={"none"} autoCorrect={false} textContentType={"none"}
                           onSubmitEditing={() => {
                           }} blurOnSubmit={true} editable={!isLoading}/>
                <Text style={styles.inputLength}>
                    {text.length} / {MAX_TEXT_LENGTH}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    input: {
        paddingHorizontal: 20,
        paddingTop: 20
    },
    inputLength: {
        alignSelf: 'flex-end',
        fontSize: 12,
        paddingHorizontal: 20,
        color: GRAY.DARK
    }
})

export default WriteTextScreen;
