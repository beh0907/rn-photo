import React, {useEffect, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import AuthStack from "./AuthStack";
import {Asset} from "expo-asset";
import {initFirebase} from "../api/Firebase";
import {useUserState} from "../context/UserContext";
import MainStack from "./MainStack";

const Navigation = () => {
    const [user] = useUserState()
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                await SplashScreen.preventAutoHideAsync()
                await Asset.fromModule(require('../../assets/cover.png')).downloadAsync() // 백그라운드 이미지 캐싱
                const app = initFirebase()
            } catch (e) {
                console.log(e)
            } finally {
                setIsReady(true)
            }
        })()
    }, [])

    const onReady = async () => {
        if (isReady) await SplashScreen.hideAsync()
    }

    if (!isReady) return null

    return (
        <NavigationContainer onReady={onReady}>
            {user.uid ? <MainStack/> : <AuthStack/>}
        </NavigationContainer>
    );
};

export default Navigation;
