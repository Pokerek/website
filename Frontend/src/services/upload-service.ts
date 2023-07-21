import { BACKEND_URL } from "../constants";

export default class UploadService {
    static async uploadImage(image: File, name: string): Promise<string | null> {
        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("name", name)

            const response = await fetch(`${BACKEND_URL}/uploads/image`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to upload image");

            const { path } = await response.json() as { path: string, message: string };
            return path;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}