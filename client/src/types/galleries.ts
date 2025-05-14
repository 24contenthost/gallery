import {Image} from "./images.ts";

export interface Gallery {
    id: number;
    name: string;
    createdAt: string;
    images?: Array<Image>;
}



export interface GalleryCreateData {
    name: string;
}




export interface GalleryUpdateData {
    name?: string;
}


export interface GalleryDeleteData {
    galleryId: number;
}


export interface AttachImagesToGalleryData {
    galleryId: number;
    imageIds: number[];
}

export interface DetachImageFromGalleryData {
    galleryId: number;
    imageId: number;
}


