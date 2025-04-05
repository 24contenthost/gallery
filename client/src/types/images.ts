export interface Gallery {
    id: number;
    name: string;
    createdAt: string;
    images?: Array<Image>;
}

export interface Image {
    id: number;
    url: string;
    previewUrl: string;
    name: string;
}



export interface ImageUpdateData {
    name?: string;
}



export interface UploadImagesData {
    images: File[];
}



export interface ImageDeleteData {
    imageId: number;
}

