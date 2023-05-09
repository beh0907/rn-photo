import React from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, View} from "react-native";
import {WHITE} from "../colors";
import {useNavigation} from "@react-navigation/native";
import {MainRoutes} from "../navigations/Routes";

const SelectPhotosScreen = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Text>Select Photos</Text>
            <Button title={"Tab"} onPress={() => navigation.navigate(MainRoutes.CONTENT_TAB)}/>
        </View>
    );
};

SelectPhotosScreen.propTypes = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WHITE
    }
})

export default SelectPhotosScreen;
