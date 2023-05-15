import {
    collection,
    doc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    orderBy,
    limit,
    startAfter,
    where,
    deleteDoc
} from 'firebase/firestore'

import React from 'react';

const getOption = ({after, uid}) => {
    const collectionRef = collection(getFirestore(), 'posts')

    //특정 유저의 글만 가져오기 위한 uid값 여부 체크
    if (uid) {
        //uid가 일치한(ex) 내가 작성한 게시글) 게시글만 조건을 통해 가져온다
        //where절 같이 쿼리의 조건과 같은 항목이 추가될땐 파이어베이스 내에서 색인 처리가 필요하다 (콘솔에서 에러 메시지와 함께 색인생성 링크를 제공해줌)
        return after
            ? query(collectionRef, where('user.uid', '==', uid), orderBy('createdTs', 'desc'), startAfter(after), limit(10))
            : query(collectionRef, where('user.uid', '==', uid), orderBy('createdTs', 'desc'), limit(10))
    } else {
        //조건 없이 모든 게시글을 10개 단위로 끊어(유사 페이징처리) 조회한다
        return after
            ? query(collectionRef, orderBy('createdTs', 'desc'), startAfter(after), limit(10))   // 있으면 그 이후 데이터
            : query(collectionRef, orderBy('createdTs', 'desc'), limit(10)) // 없으면 첫 10개
    }
}

export const createPost = async ({photos, location, text, user}) => {
    try {
        const {uid, displayName, photoURL} = user
        const collectionRef = collection(getFirestore(), 'posts')
        const documentRef = doc(collectionRef)
        const id = documentRef.id

        //FireStore는 NoSQL이기 때문에 강제적인 관계 구조는 없다
        await setDoc(documentRef, {
            id,
            photos,
            location,
            text,
            user: {uid, displayName, photoURL},
            createdTs: Date.now()
        })
    } catch (e) {
        throw new Error('글 작성 실패')
    }
};

export const getPosts = async ({after, uid}) => {
    const option = getOption({after, uid})

    const documentSnapshot = await getDocs(option)

    const list = documentSnapshot.docs.map(doc => doc.data())
    const last = documentSnapshot.docs[documentSnapshot.docs.length - 1]

    return {list, last}
}

export const getPostsByLocation = async ({after, location}) => {
    const collectionRef = collection(getFirestore(), 'posts')

    //where절 location이 추가 됐기 때문에 관련 색인 설정을 파이어베이스로 진행해야한다
    const option = after
        ? query(collectionRef, where('location', '==', location), orderBy('createdTs', 'desc'), startAfter(after), limit(10))
        : query(collectionRef, where('location', '==', location), orderBy('createdTs', 'desc'), limit(10))


    const documentSnapshot = await getDocs(option)

    const list = documentSnapshot.docs.map(doc => doc.data())
    const last = documentSnapshot.docs[documentSnapshot.docs.length - 1]

    return {list, last}
}

export const deletePost = async (id) => {
    await deleteDoc(doc(getFirestore(), `posts/${id}`));
};

export const updatePost = async (post) => {
    try {
        await setDoc(doc(getFirestore(), `posts/${post.id}`), post);
    } catch (e) {
        // eslint-disable-next-line no-console
        // console.log('updatePost error: ', e);
        throw new Error('글 수정 실패');
    }
};
