import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const UploadMemberImage = (file: any): Promise<string> => {    
    const storageRef = ref(storage, `avatar_member/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        resolve(downloadURL);
                    })
                    .catch((error) => reject(error));
            }
        );
    });
}

export default UploadMemberImage;
