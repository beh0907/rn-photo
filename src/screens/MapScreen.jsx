import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from "react-native";
import {WHITE} from "../colors";

const MapScreen = () => {
    return (
        <View style={styles.container}>
            <Text>MAP</Text>
        </View>
    );
};

MapScreen.propTypes = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MapScreen;
