import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import {GRAY} from "../colors";
import PostItem from "./PostItem";
import usePosts from "../hooks/UsePosts";
import event, {EventTypes} from "../event";
import PropTypes from "prop-types";
import {useUserState} from "../contexts/UserContext";

const PostList = ({isMyPost}) => {
    const [user] = useUserState()
    const {posts, fetchNextPage, refetch, refetching, deletePost, updatePost} = usePosts(isMyPost && user.uid)

    useEffect(() => {
        //이벤트 등록
        event.addListener(EventTypes.REFRESH, refetch)
        event.addListener(EventTypes.DELETE, deletePost)
        event.addListener(EventTypes.UPDATE, updatePost)

        //리스트를 리렌더링 할 때 같은 이벤트가 복수 등록 되는 것을 막기 위해 정리
        return () => event.removeAllListeners()
    }, [refetch, deletePost, updatePost])

    return (
        <FlatList
            data={posts}
            renderItem={({item}) => <PostItem post={item}/>}
            ItemSeparatorComponent={() => <View style={styles.separator}></View>}
            onEndReached={fetchNextPage}
            refreshing={refetching}
            onRefresh={refetch}
        />
    )
};

//기본 값을 FALSE로 설정
// PostList.defaultProps = {
//     isMyPost: false,
// };

PostList.propTypes = {
    isMyPost: PropTypes.bool
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: GRAY.LIGHT
    }
})

export default PostList;
