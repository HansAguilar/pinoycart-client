interface CartItem {
    itemID: string;
    itemQuantity: number;
    // other properties if any
}

export interface ICart {
    cartItems: CartItem[]
}