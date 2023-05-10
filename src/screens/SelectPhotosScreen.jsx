import React, {useEffect, useState} from 'react';
import {Image, Platform, Pressable, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {BLACK, GRAY, PRIMARY, WHITE} from "../colors";
import {useNavigation, useRoute} from "@react-navigation/native";
import {MainRoutes} from "../navigations/Routes";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Swiper from 'react-native-swiper'
import {BlurView} from "expo-blur";
import ImageSwiper from "../components/ImageSwiper";

const SelectPhotosScreen = () => {
    const navigation = useNavigation()
    const {params} = useRoute()

    const width = useWindowDimensions().width
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        if (params) setPhotos(params.selectedPhotos ?? [])
    }, [params])

    return (
        <View style={styles.container}>
            <Text style={styles.description}>이미지는 최대 4장까지 선택할 수 있습니다</Text>

            <View style={{width, height: width}}>
                {
                    photos.length
                        ? <ImageSwiper photos={photos}/>
                        : <Pressable style={styles.photoButton}
                                     onPress={() => navigation.navigate(MainRoutes.IMAGE_PICKER, {maxCount: 4})}>
                            <MaterialCommunityIcons name={'image-plus'} size={80} color={GRAY.DEFAULT}/>
                        </Pressable>
                }
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    description: {
        color: GRAY.DARK,
        paddingHorizontal: 20,
        marginVertical: 10
    },
    photoButton: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GRAY.LIGHT
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    dot: {
        backgroundColor: BLACK,
        width:8,
        height:8,
        borderRadius:4,
        margin:3
    },
    activeDot: {
        backgroundColor: PRIMARY.DEFAULT,
        width:8,
        height:8,
        borderRadius:4,
        margin:3
    }
})

export default SelectPhotosScreen;
