export interface ICreateVendor{
    vendorName: string;
    vendorDesc: string;
    image: string;
}

export interface IVendorState {
    data: IUserVendorInfo | null;
    loading: boolean;
}

interface IUserVendorInfo{
    userID: string,
    vendorName: string,
    vendorDesc: string,
    vendorBanner: string | null,
    vendorFollowers: number,
    vendorRatings: number,
    vendorFeedback: [string],
    vendorItems: [string]
}