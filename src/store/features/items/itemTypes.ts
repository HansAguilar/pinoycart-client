export interface IItems {
    vendorID?: {
        userID: string,
        vendorName: string,
        vendorDesc: string,
        vendorBanner: string | null,
        vendorFollowers: number,
        vendorRatings: number,
        vendorFeedback: [string],
        vendorItems: [string]
    },
    _id: string,
    itemName: string,
    itemDesc: string,
    itemPrice: number,
    itemCategory: string,
    itemStock: number,
    itemImages: string[],
    itemRatings?: number,
    itemLikes?: number,
    itemReviews?: [
        {
            userID: string,
            rating: number,
            comment: string
        }
    ],
}

export interface IItemsState {
    loading: boolean;
    items: IItems[];
    currentItem: {
        _id: string,
        vendorID: string;
        itemName: string;
        itemDesc: string;
        itemPrice: number;
        itemCategory: string;
        itemStock: number;
        itemImages: string[];
        itemLikes: number;
        itemRatings: number;
        itemReviews: [
            {
                userID: string;
                username: string;
                likes: number;
                rating: number;
                isLiked: boolean;
                date: Date | string;
                comment: string;
            }
        ]
    } | undefined
}
