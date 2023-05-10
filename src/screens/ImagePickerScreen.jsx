import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Alert, FlatList, Image, Pressable, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import HeaderRight from "../components/HeaderRight";
import * as MediaLibrary from 'expo-media-library'
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {PRIMARY} from "../colors";

const initialListInfo = {
    endCursor: '',
    hasNextPage: true
}

const ImagePickerScreen = () => {
    const navigation = useNavigation()
    const [status, requestPermission] = MediaLibrary.usePermissions()

    const width = useWindowDimensions().width / 3
    const [photos, setPhotos] = useState([])
    const listInfo = useRef(initialListInfo)
    const [refreshing, setRefreshing] = useState(false)
    const [selectedPhotos, setSelectedPhotos] = useState([])

    //권한 요청
    useEffect(() => {
        (async () => {
            const {granted} = await requestPermission()
            if (!granted) {
                Alert.alert('사진 접근 권한', '사진 접근 권한이 필요합니다.', [
                    {
                        text: '확인',
                        onPress: () => {
                            navigation.canGoBack() && navigation.goBack()
                        }
                    }
                ])
            }
        })()
    }, [navigation, requestPermission])

    //이미지 가져오기 함수
    const getPhotos = useCallback(async () => {
        const options = {
            first: 30,
            sortBy: [MediaLibrary.SortBy.creationTime]
        }

        if (listInfo.current.endCursor) options['after'] = listInfo.current.endCursor

        if (listInfo.current.hasNextPage) {
            const {assets, endCursor, hasNextPage} = await MediaLibrary.getAssetsAsync(options)
            setPhotos(prev => options.after ? [...prev, ...assets] : assets)
            listInfo.current = {endCursor, hasNextPage}
        }
    }, [listInfo.hasNextPage])

    //이미지 리스트 갱신
    const onRefresh = async () => {
        setRefreshing(true)
        listInfo.current = initialListInfo
        await getPhotos()
        setRefreshing(false)
    }

    //이미지 가져오기
    useEffect(() => {
        //권한이 허용된 상태라면
        if (status?.granted) getPhotos()
    }, [getPhotos, status?.granted])

    //우측 상단 버튼
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight onPress={() => {
            }}/>
        })
    }, [navigation])

    //이미지 선택 여부 체크
    //선택된 이미지에서 아이디를 비교해 리스트 내에서 찾는다면
    const isSelectedPhoto = photo => {
        return selectedPhotos.findIndex(item => item.id === photo.id) > -1
    }

    //이미지 클릭 시 선택/해제 상태 저장
    const togglePhoto = photo => {
        const isSelected = isSelectedPhoto(photo)
        setSelectedPhotos(prev =>
            isSelected
                ? prev.filter(item => item.id !== photo.id)
                : [...prev, photo]
        )
    }

    return (
        <View style={styles.container}>
            <FlatList style={styles.list}
                      data={photos}
                      renderItem={({item}) => {
                          const isSelected = isSelectedPhoto(item)
                          return (
                              <Pressable style={{width, height: width}} key={item.id}
                                         onPress={() => togglePhoto(item)}>
                                  <Image source={{uri: item.uri}} style={styles.photo}/>
                                  {
                                      isSelected && (
                                          <View style={[StyleSheet.absoluteFill, styles.checkIcon]}>
                                              <MaterialCommunityIcons name={'check-circle'} size={40}
                                                                      color={PRIMARY.DEFAULT}/>
                                          </View>
                                      )
                                  }
                              </Pressable>
                          )
                      }}
                      numColumns={3}
                      onEndReached={getPhotos}
                      onEndReachedThreshold={0.4}
                      onRefresh={onRefresh}
                      refreshing={refreshing}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        width: '100%',
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    checkIcon: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ImagePickerScreen;
