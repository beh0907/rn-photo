import React from 'react';
import PropTypes from 'prop-types';
import {Button, Image, Pressable, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {WHITE} from "../colors";
import {useNavigation} from "@react-navigation/native";
import {ContentRoutes} from "../navigations/Routes";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const HomeScreen = () => {
    const navigation = useNavigation()
    const {top} = useSafeAreaInsets()
    const height = useWindowDimensions().height / 4

    return (
        <View style={[styles.container, {paddingTop: top}]}>
            <View style={styles.topContainer}>
                <Image source={require('../../assets/icon.png')} style={[styles.icon]}/>
                <Text style={styles.title}>Place Photos</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable onPress={() => navigation.navigate(ContentRoutes.LIST)}>
                    <Image source={require('../../assets/home-clock.png')} style={[styles.image, {height}]}/>
                    <Text style={styles.buttonTitle}>타임라인</Text>
                </Pressable>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable onPress={() => navigation.navigate(ContentRoutes.MAP)}>
                    <Image source={require('../../assets/home-clock.png')} style={[styles.image, {height}]}/>
                    <Text style={styles.buttonTitle}>지도</Text>
                </Pressable>
            </View>
        </View>
    );
};

HomeScreen.propTypes = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: WHITE,
        paddingHorizontal: 20
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        marginLeft: 10
    },
    buttonContainer: {
        marginVertical: 20
    },
    image: {
        width: '100%',
        borderRadius: 10
    },
    buttonTitle: {
        position: 'absolute',
        color: WHITE,
        fontSize: 40,
        fontWeight: '700',
        bottom: 30,
        left: 30
    }
})

export default HomeScreen;
