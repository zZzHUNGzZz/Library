import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const UploadAccountImage = (file: any) => {
    if (!file) return new Promise((resolve, reject) => reject("File is empty"));
    
    const storageRef = ref(storage, `avatar_account/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        console.log(downloadURL);
                        resolve(downloadURL);
                    })
                    .catch((error) => reject(error));
            }
        );
    });
}

export default UploadAccountImage;
