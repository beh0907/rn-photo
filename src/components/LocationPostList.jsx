import React from 'react';
import PropTypes from 'prop-types';
import usePostsByLocation from "../hooks/UsePostsByLocation";
import {FlatList} from "react-native";
import LocationPostItem from "./LocationPostItem";

const LocationPostList = ({location}) => {
    const {data, fetchNextPage} = usePostsByLocation(location)

    return (
        <FlatList
            horizontal={true}
            data={data}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({item}) => (
                <LocationPostItem uri={item}/>
            )}
            onEndReached={fetchNextPage}
        />
    );
};

LocationPostList.propTypes = {
    location: PropTypes.string.isRequired
};

export default LocationPostList;
