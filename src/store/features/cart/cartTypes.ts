interface CartItem {
    itemID: string;
    itemName: string,
    itemDesc: string,
    itemPrice: number,
    itemCategory: string[],
    itemQuantity: number,
    itemImages: string[],
    itemLikes: number,
    itemRatings: number,
    // other properties if any
}

export interface ICart {
    cartItems: CartItem[];
    total: number
}