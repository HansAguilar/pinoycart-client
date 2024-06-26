interface IUserInfo {
    cart: string[];
    followed: string[];
    orders: string[];
    role: string;
    username: string
    vendorInfo: string 
    _id: string
}

export interface IAuthState {
    isLogged: boolean;
    data: IUserInfo | null;
    loading: boolean;
}