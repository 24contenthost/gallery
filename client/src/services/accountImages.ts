import {apiRequest} from "../api/apiRequest.ts";
import {Image, ImageUpdateData, UploadImagesData} from "../types/images.ts";

export const accountImagesService = {
    async getImages(): Promise<Image[]> {
        return apiRequest<Image[]>("GET", "/api/account/images");
    },

    async getImageById(imageId: number): Promise<Image> {
        return apiRequest<Image>("GET", `/api/account/images/${imageId}`);
    },

    async updateImage(imageId: number, imageData: ImageUpdateData): Promise<Image> {
        return apiRequest<Image>("PUT", `/api/account/images/${imageId}`, imageData);
    },

    async deleteImage(imageId: number): Promise<void> {
        await apiRequest("DELETE", `/api/account/images/${imageId}`);
    },
    async uploadImages(uploadImagesData: UploadImagesData): Promise<Image[]> {
        const data = new FormData();
        uploadImagesData.images.forEach(image => data.append('images[]', image));

        console.debug(data);
        return await apiRequest<Image[]>("POST", "/api/account/images/", data);
    },

}

