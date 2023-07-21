import { useState } from "react";

import UploadService from "../services/upload-service";

const useUploadImage = () => {
    const [image, setImage] = useState<File>();

    const uploadImage = async (name: string): Promise<string | null> => {
        if (!image) return null;

        const imageUrl = await UploadService.uploadImage(image, name.toLowerCase());
        if (!imageUrl) throw new Error("No image url returned from server");

        return imageUrl;
    };

    return { setImage, uploadImage };
}

export default useUploadImage;