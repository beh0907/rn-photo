import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, View} from "react-native";
import {GRAY} from "../colors";
import PostItem from "./PostItem";

const PostList = ({data, fetchNextPage, refreshing, refetch}) => {
    return (
        <FlatList
            data={data}
            renderItem={({item}) => <PostItem post={item}/>}
            ItemSeparatorComponent={() => <View style={styles.separator}></View>}
            onEndReached={fetchNextPage}
            refreshing={refreshing}
            onRefresh={refetch}
        />
    )
};

PostList.propTypes = {
    data: PropTypes.array.isRequired,
    fetchNextPage: PropTypes.func,
    refreshing: PropTypes.bool,
    refetch: PropTypes.func,
};

const styles = StyleSheet.create({
    separator: {
        marginVertical: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: GRAY.LIGHT
    }
})

export default PostList;
