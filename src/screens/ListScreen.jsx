import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from "react-native";
import {WHITE} from "../colors";
import {getPosts} from "../api/post";
import PostItem from "../components/PostItem";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import PostList from "../components/PostList";

const ListScreen = () => {
    const {top} = useSafeAreaInsets()

    const [posts, setPosts] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const isLoadingRef = useRef(false)
    const lastRef = useRef(null)

    const getList = useCallback(async () => {
        if (!isLoadingRef.current) {
            isLoadingRef.current = true;

            const {list, last} = await getPosts({after: lastRef.current})

            if (list.length > 0) {
                setPosts(prev => lastRef.current ? [...prev, ...list] : list)
                lastRef.current = last
            }

            isLoadingRef.current = false;
        }
    }, [])

    const refetch = async () => {
        setRefreshing(true)
        lastRef.current = null
        await getList()
        setRefreshing(false)
    }

    useEffect(() => {
        getList()
    }, [getList])

    return (
        <View style={[styles.container, {paddingTop: top}]}>
            <PostList data={posts} fetchNextPage={getList} refreshing={refreshing} refetch={refetch}/>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
})

export default ListScreen;
