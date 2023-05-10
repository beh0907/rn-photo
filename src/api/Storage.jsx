import React from 'react';
import {ref, getStorage, uploadBytes, getDownloadURL} from 'firebase/storage'

export const uploadPhoto = async ({uri, uid}) => {
    if (uri.startsWith('https')) return uri

    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
            resolve(xhr.response)
        }
        xhr.onerror = function (e) {
            reject(new Error('사진 업로드에 실패하였습니다.'))
        }

        xhr.responseType = 'blob'
        xhr.open('GET', uri, true)
        xhr.send(null)
    })

    const fileName = uri.split('/').pop()
    const storageRef = ref(getStorage(), `/${uid}/${fileName}`)
    await uploadBytes(storageRef, blob)

    blob.close()

    return await getDownloadURL(storageRef)
}

