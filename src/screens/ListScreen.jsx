import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from "react-native";
import {WHITE} from "../colors";

const ListScreen = () => {
    return (
        <View style={styles.container}>
            <Text>LIST</Text>
        </View>
    );
};

ListScreen.propTypes = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ListScreen;
