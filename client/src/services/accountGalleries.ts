import {
    Gallery,
    GalleryCreateData,
    GalleryDeleteData,
    GalleryUpdateData,
} from "../types/galleries.ts";
import { Image } from "../types/images.ts";
import { apiRequest } from "../api/apiRequest.ts";

export const accountGalleriesService = {
    async createGallery(galleryData: GalleryCreateData): Promise<Gallery> {
        return apiRequest<Gallery>("POST", "/api/account/galleries", galleryData);
    },

    async getGalleries(): Promise<Gallery[]> {
        return apiRequest<Gallery[]>("GET", "/api/account/galleries");
    },

    async getGalleryById(galleryId: number): Promise<Gallery> {
        return apiRequest<Gallery>("GET", `/api/account/galleries/${galleryId}`);
    },

    async updateGallery(galleryId: number, galleryData: GalleryUpdateData): Promise<Gallery> {
        return apiRequest<Gallery>("PUT", `/api/galleries/${galleryId}`, galleryData);
    },

    async deleteGallery(data: GalleryDeleteData): Promise<void> {
        await apiRequest("DELETE", `/api/account/galleries/${data.galleryId}`);
    },

    async getGalleryImages(galleryId: number): Promise<Image[]> {
        return apiRequest<Image[]>("GET", `/api/account/galleries/${galleryId}`);
    },

    async attachImageToGallery(galleryId: number, imageId: number): Promise<void> {
        await apiRequest("POST", `/api/account/galleries/${galleryId}/attach-image/${imageId}`);
    },
    async detachImageFromGallery(galleryId: number, imageId: number): Promise<void> {
        await apiRequest("DELETE", `/api/account/galleries/${galleryId}/detach-image/${imageId}`);
    },
};
