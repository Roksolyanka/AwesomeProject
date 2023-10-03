import { getDownloadURL, uploadBytes } from "firebase/storage";

const uploadToStorage = async (storageRef, photoFile) => {
  try {
    const metadata = {
      contentType: "image/jpeg",
    };
    await uploadBytes(storageRef, photoFile, metadata);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    throw error;
  }
};

export default uploadToStorage;
