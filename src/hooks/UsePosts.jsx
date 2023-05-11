import React, {useCallback, useEffect, useRef, useState} from 'react';
import {getPosts} from "../api/Post";

const UsePosts = (uid) => {
    const [posts, setPosts] = useState([])
    const [refetching, setRefetching] = useState(false)

    const isLoadingRef = useRef(false)
    const lastRef = useRef(null)

    const fetchNextPage = useCallback(async () => {
        if (!isLoadingRef.current) {
            isLoadingRef.current = true;

            const {list, last} = await getPosts({after: lastRef.current, uid})

            if (list.length > 0) {
                setPosts(prev => lastRef.current ? [...prev, ...list] : list)
                lastRef.current = last
            }

            isLoadingRef.current = false;
        }
    }, [uid])

    const refetch = async () => {
        setRefetching(true)
        lastRef.current = null
        await fetchNextPage()
        setRefetching(false)
    }

    const deletePost = ({id}) => {
        setPosts(prev => prev.filter(item => item.id !== id))
    }

    const updatePost = (post) => {
        setPosts(prev => prev.map(item => (item.id === post.id ? post : item)))
    }

    useEffect(() => {
        fetchNextPage()
    }, [fetchNextPage])

    return {posts, fetchNextPage, refetch, refetching, deletePost, updatePost}
};

export default UsePosts;
