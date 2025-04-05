import {Gallery} from "../types/galleries.ts";
import {apiRequest} from "../api/apiRequest.ts";

export const galleriesService = {

    async getGalleries(): Promise<Gallery[]> {
        return apiRequest<Gallery[]>("GET", "/api/galleries");
    },

    async getGalleryById(galleryId: number): Promise<Gallery> {
        return apiRequest<Gallery>("GET", `/api/galleries/${galleryId}`);
    },

}

