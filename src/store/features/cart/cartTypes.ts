interface CartItem {
    _id: string;
    itemName: string,
    itemDesc: string,
    itemPrice: number,
    itemCategory: string,
    itemStock: number,
    itemImages: string[],
    itemLikes: number,
    itemRatings: number,
    // other properties if any
}

export interface ICart {
    cartItems: CartItem[];
    total: number;
    loading: boolean
}