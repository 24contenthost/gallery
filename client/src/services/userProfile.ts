
import { UserProfile } from "@/types/userProfile";
import {apiRequest} from "@/api/apiRequest.ts";
import {Gallery} from "@/types/galleries.ts";
import {Image} from "@/types/images.ts";


export const userProfileService = {
    async getUserProfile(id: number): Promise<UserProfile> {
        return apiRequest<UserProfile>("GET", `/api/users/${id}`);
    },

    async getUserProfileImages(id: number): Promise<{ profile: UserProfile; images: Image[] }> {
        return apiRequest<{ profile: UserProfile; images: Image[] }>("GET", `/api/users/${id}/images`);
    },

    async getUserProfileGalleries(id: number): Promise<{ profile: UserProfile; galleries: Gallery[] }> {
        return apiRequest<{ profile: UserProfile; galleries: Gallery[] }>("GET", `/api/users/${id}/galleries`);
    },
};