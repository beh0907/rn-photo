import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {View} from "react-native";
import FastImage from "./FastImage";

const LocationPostItem = memo(({uri}) => {
    return (
        <View style={{paddingHorizontal: 5}}>
            <FastImage source={{uri: uri}} style={{width: 150, height: 150}}/>
        </View>
    );
});

LocationPostItem.displayName = 'LocationPostItem'

LocationPostItem.propTypes = {
    uri: PropTypes.string.isRequired
};

export default LocationPostItem;
