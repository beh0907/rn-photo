import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {googleMapApiKey} from "../../env";
import {StyleSheet, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {GRAY, PRIMARY, WHITE} from "../colors";

const LocationSearch = forwardRef(({styles, onPress, isLoading, isSelected, iconVisible}, ref) => {
    return (
        <View style={[defaultStyles.container, styles?.container]}>
            <GooglePlacesAutocomplete
                placeholder={"지역을 설정해주세요"}
                styles={{
                    container: {flex: 0},
                    textInput: {paddingLeft: iconVisible ? 30 : 10},
                }}
                onPress={onPress}
                onFail={e => {}}
                query={{key: googleMapApiKey, language: 'ko'}}
                debounce={400}
                enablePoweredByContainer={false}
                textInputProps={{editable: !isLoading}}
                ref={ref}
                fetchDetails={true}
            />

            {iconVisible && (
                <View style={[defaultStyles.icon, styles?.icon]}>
                    <MaterialCommunityIcons
                        name="map-marker"
                        size={20}
                        color={isSelected ? PRIMARY.DEFAULT : GRAY.LIGHT}
                    />
                </View>
            )}
        </View>
    );
});

LocationSearch.defaultProps = {
    isLoading: false,
    isSelected: false,
    iconVisible: true,
}

LocationSearch.propTypes = {
    styles: PropTypes.object,
    onPress: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isSelected: PropTypes.bool,
    iconVisible: PropTypes.bool,
};

const defaultStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: GRAY.LIGHT,
    },
    icon: {
        position: 'absolute',
        left: 20,
        top: 16,
    },
});

export default LocationSearch;
