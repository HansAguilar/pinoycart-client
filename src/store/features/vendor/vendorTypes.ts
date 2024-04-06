import { IItems } from "../items/itemTypes"

export interface ICreateVendor {
    vendorName: string;
    vendorDesc: string;
    image: string;
}

export interface IVendorState {
    data: IUserVendorInfo | null;
    loading: boolean;
    items: IItems[];
    msg: string
}

interface IUserVendorInfo {
    _id: string;
    userID: string;
    vendorName: string;
    vendorDesc: string;
    vendorBanner: string | null;
    vendorFollowers: number;
    vendorRatings: number;
    vendorFeedback: string[];
    vendorItems: string[];
}