export interface IProduct {
    vendorID: string,
    itemName: string,
    itemDesc: string,
    itemPrice: number,
    itemCategory: [string],
    itemStock: number,
    itemImages: [string],
    itemLikes: number,
    itemRatings: number,
    itemReviews: [
        {
            userID: string,
            rating: number,
            comment: string
        }
    ],
}