import {collection, doc, getDocs, getFirestore, query, setDoc, orderBy, limit, startAfter} from 'firebase/firestore'

import React from 'react';

export const createPost = async ({photos, location, text, user}) => {
    const {uid, displayName, photoURL} = user
    const collectionRef = collection(getFirestore(), 'posts')
    const documentRef = doc(collectionRef)
    const id = documentRef.id

    await setDoc(documentRef, {
        id,
        photos,
        location,
        text,
        user: {uid, displayName, photoURL},
        createdTs: Date.now()
    })
};

export const getPosts = async ({after}) => {
    const collectionRef = collection(getFirestore(), 'posts')
    const option = after ?  // 시간 역순으로 10개씩 after 값 체크
        query(collectionRef, orderBy('createdTs', 'desc'), startAfter(after), limit(10)) :  // 있으면 그 이후 데이터
        query(collectionRef, orderBy('createdTs', 'desc'), limit(10)) // 없으면 첫 10개

    const documentSnapshot = await getDocs(option)

    const list = documentSnapshot.docs.map(doc => doc.data())
    const last = documentSnapshot.docs[documentSnapshot.docs.length - 1]

    return {list, last}
}
