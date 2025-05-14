import {
    AttachImagesToGalleryData, DetachImageFromGalleryData,
    Gallery,
    GalleryCreateData,
    GalleryDeleteData,
    GalleryUpdateData,
} from "../types/galleries.ts";
import {apiRequest} from "../api/apiRequest.ts";

export const accountGalleriesService = {
    async createGallery(galleryData: GalleryCreateData): Promise<Gallery> {
        return apiRequest<Gallery>("POST", "/api/account/galleries", galleryData);
    },

    async getGalleries(): Promise<Gallery[]> {
        return apiRequest<Gallery[]>("GET", "/api/account/galleries");
    },



    async updateGallery(galleryId: number, galleryData: GalleryUpdateData): Promise<Gallery> {
        return apiRequest<Gallery>("PUT", `/api/galleries/${galleryId}`, galleryData);
    },

    async deleteGallery(data: GalleryDeleteData): Promise<void> {
        await apiRequest("DELETE", `/api/account/galleries/${data.galleryId}`);
    },

    async getGallery(galleryId: number): Promise<Gallery> {
        return apiRequest<Gallery>("GET", `/api/account/galleries/${galleryId}`);
    },

    async attachImagesToGallery(data: AttachImagesToGalleryData): Promise<void> {
        await apiRequest("POST", `/api/account/galleries/${data.galleryId}/attach-images`, {
            image_ids: data.imageIds,
        });
    },
    async detachImageFromGallery(data: DetachImageFromGalleryData): Promise<void> {
        await apiRequest("DELETE", `/api/account/galleries/${data.galleryId}/detach-image/${data.imageId}`);
    },

};
