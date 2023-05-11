import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, useWindowDimensions, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import HeaderRight from "../components/HeaderRight";
import {GRAY, PRIMARY, WHITE} from "../colors";
import FastImage from "../components/FastImage";
import LocationSearch from "../components/LocationSearch";
import {useUserState} from "../contexts/UserContext";
import {uploadPhoto} from "../api/Storage";
import {createPost, updatePost} from "../api/Post";
import event, {EventTypes} from "../event";

const MAX_TEXT_LENGTH = 50

const WriteTextScreen = () => {
    const navigation = useNavigation()
    const {params} = useRoute()
    const width = useWindowDimensions().width / 4

    const [photoUris, setPhotoUris] = useState([])
    const [text, setText] = useState('')
    const [location, setLocation] = useState('')

    const [disabled, setDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [user] = useUserState()

    const locationRef = useRef(null)

    useEffect(() => {
        if (params) {
            const {photoUris, post} = params

            if (photoUris) setPhotoUris(photoUris ?? [])
            else if (post) {
                setPhotoUris(post.photos)
                setText(post.text)
                setLocation(post.location)
                locationRef.current?.setAddressText(post.location)
            }
        }
    }, [params])

    useEffect(() => {
        setDisabled((isLoading || !text || !location))
    }, [isLoading, text, location])

    const onSubmit = useCallback(async () => {
        setIsLoading(true)

        try {
            if (params?.photoUris) {
                const photos = await Promise.all(photoUris.map(uri => uploadPhoto({uri, uid: user.uid})))

                //게시글 작성
                await createPost({photos, location, text, user})

                //새 게시글 등록 후 바로 리스트를 갱신시키기 위해 이벤트를 전달
                event.emit(EventTypes.REFRESH)
            } else if (params?.post) {
                const {post} = params
                const updatedPost = {...post, location, text};

                // 본래 post의 값과 수정된 위치정보와 설명텍스트 정보를 덮어씌워 넘겨준다
                await updatePost(updatedPost)

                //게시글 수정 후 바로 리스트를 갱신시키기 위해 이벤트를 전달
                event.emit(EventTypes.UPDATE, updatedPost)
            }

            //작성이 완료됐다면 이전 페이지로 이동
            //이미지를 선택하는 화면에서 navigate가 아닌 replace를 썼기 때문에 탭 메뉴로 이동
            navigation.goBack()
        } catch (e) {
            Alert.alert(e.message);
            setIsLoading(false)
        }

    }, [photoUris, user, location, text, navigation, params])

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
                            isSelected={!!location} ref={locationRef}/>

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
