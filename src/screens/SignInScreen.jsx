import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {Image, Keyboard, StyleSheet, Text, View} from "react-native";
import {AuthRoutes} from "../navigations/Routes";
import Input, {InputTypes, ReturnKeyTypes} from "../components/Input";
import Button from "../components/Button";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import SafeInputView from "../components/SafeInputView";
import TextButton from "../components/TextButton";
import HR from "../components/HR";
import {StatusBar} from "expo-status-bar";
import {WHITE} from "../colors";

const SignInScreen = () => {
    const navigation = useNavigation()
    const {top, bottom} = useSafeAreaInsets()

    const passwordRef = useRef()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        setDisabled(!email || !password)
    }, [email, password])

    const onSubmit = () => {
        Keyboard.dismiss()

        if (!disabled && !isLoading) {
            setIsLoading(true)
            console.log(email, password)
            setIsLoading(false)
        }
    }

    return (
        <SafeInputView>
            <StatusBar style={"light"}/>
            <View style={[styles.container, {paddingTop: top}]}>
                <View style={StyleSheet.absoluteFill}>
                    <Image source={require('../../assets/cover.png')} style={{width: '100%'}} resizeMode={"cover"}/>
                </View>

                <View style={[styles.form, {paddingBottom: bottom ? bottom + 10 : 30}]}>
                    <Text>Sign In</Text>
                    <Input
                        styles={{
                            container: {marginBottom: 20},
                        }}
                        value={email}
                        onChangeText={(text) => setEmail(text.trim())}
                        inputType={InputTypes.EMAIL}
                        returnKeyType={ReturnKeyTypes.NEXT}
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />
                    <Input
                        ref={passwordRef}
                        styles={{
                            container: {marginBottom: 20},
                        }}
                        value={password}
                        onChangeText={(text) => setPassword(text.trim())}
                        inputType={InputTypes.PASSWORD}
                        returnKeyType={ReturnKeyTypes.DONE}
                        onSubmitEditing={onSubmit}
                    />

                    <Button title="로그인"
                            onPress={onSubmit}
                            disabled={disabled}
                            isLoading={isLoading}
                            style={{
                                container: {
                                    marginTop: 20
                                }
                            }}/>


                    <HR text={'OR'} styles={{container: {marginVertical: 30}}}/>

                    <TextButton onPress={() => navigation.navigate(AuthRoutes.SIGN_UP)} title={"회원 가입"}/>
                </View>
            </View>
        </SafeInputView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },
    form: {
        alignItems: 'center',
        backgroundColor: WHITE,
        paddingHorizontal: 20,
        paddingTop: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})

export default SignInScreen;
