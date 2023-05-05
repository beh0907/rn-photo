import React, {useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {StyleSheet, Text, View} from "react-native";
import {AuthRoutes} from "../navigations/Routes";
import Input, {InputTypes, ReturnKeyTypes} from "../components/Input";
import Button from "../components/Button";

const SignInScreen = () => {
    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.container}>
            <Text>Sign In</Text>
            <Input
                styles={{
                    container: {marginBottom: 20, paddingHorizontal: 20},
                    input: {borderWidth: 1}
                }}
                value={email}
                onChangeText={(text) => setEmail(text.trim())}
                inputType={InputTypes.EMAIL}
                returnKeyType={ReturnKeyTypes.NEXT}
            />
            <Input
                styles={{
                    container: {marginBottom: 20, paddingHorizontal: 20},
                    input: {borderWidth: 1}
                }}
                value={password}
                onChangeText={(text) => setPassword(text.trim())}
                inputType={InputTypes.PASSWORD}
                returnKeyType={ReturnKeyTypes.DONE}
            />
            <Button title={"Sign Up"} onPress={() => navigation.navigate(AuthRoutes.SIGN_UP)}
                    style={{
                        container: {
                            paddingHorizontal: 20,
                            marginTop: 20
                        }
                    }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default SignInScreen;
