import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from "react-native";
import {WHITE} from "../colors";
import MapView from "react-native-maps";

const MapScreen = () => {
    return (
        <View style={styles.container}>
            <MapView style={styles.map}/>
        </View>
    );
};

MapScreen.propTypes = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: '100%',
    }
})

export default MapScreen;
