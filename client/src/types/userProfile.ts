import {Gallery} from "./galleries.ts";

export interface UserProfile {
    id: number;
    name: string;
    created_at: string;
    galleries: Gallery[];
}
