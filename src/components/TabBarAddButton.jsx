import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from "react-native";
import {GRAY, PRIMARY, WHITE} from "../colors";
import {useNavigation} from "@react-navigation/native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const TabBarAddButton = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={() => navigation.navigate(MainRoutes.SELECT_PHOTOS)}>
                <MaterialCommunityIcons name={"plus"} size={25} color={WHITE}/>
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: PRIMARY.DEFAULT,
        borderRadius: 999,
        padding: 4
    }
});

export default TabBarAddButton;
