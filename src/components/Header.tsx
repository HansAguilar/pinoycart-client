import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "./ui/mode-toggle"
import { ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useNavigate } from "react-router-dom"
import { authActions } from "@/store/features/auth/authSlice"
import { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { getCart } from "@/store/features/cart/cartSlice"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import CartSidebar from "./CartSidebar"

const Header = () => {
	const user = useAppSelector((state) => state.auth)
	const cart = useAppSelector((state: RootState) => state.cart)

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [cartLength, setCartLength] = useState<number>(0);

	useEffect(() => {
		if (user.isLogged) {
			dispatch(getCart());
		}
		else {
			const getCartFromLocalStorage = localStorage.getItem('cart');
			if (getCartFromLocalStorage) {
				const localCartLength = JSON.parse(getCartFromLocalStorage);
				setCartLength(localCartLength.length)
			}
		}
	}, [])


	return (
		<Sheet>
			<header className="bg-secondary">
				<NavigationMenu className="flex items-center  flex-wrap">
					<h2 className="text-3xl font-semibold tracking-tight text-center p-2 cursor-pointer" onClick={() => navigate("/")}>
						PinoyCart
					</h2>

					<NavigationMenuList >

						<NavigationMenuItem>
							<ModeToggle />
						</NavigationMenuItem>

						<NavigationMenuItem>
							<Button variant="outline" size="icon" className="relative">
								<SheetTrigger asChild>
									<ShoppingCart className="h-5 w-5" />
								</SheetTrigger>
								<div className="absolute top-0 -right-2 h-4 w-4">
									<p className="flex items-center justify-center bg-destructive text-white rounded-full p-1 w-full h-full text-xs">
										{cart.cartItems.length ? cart.cartItems.length : cartLength}
									</p>
								</div>
							</Button>
						</NavigationMenuItem>

						{
							user.isLogged &&
							<NavigationMenuItem>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost">
											<Avatar>
												<AvatarImage src="https://github.com/shadcn.png" />
												<AvatarFallback>CN</AvatarFallback>
											</Avatar>
										</Button>
									</DropdownMenuTrigger>

									<DropdownMenuContent className="w-56" align="end" forceMount>
										<DropdownMenuLabel className="font-normal">
											<div className="flex flex-col space-y-1">
												<p className="text-sm font-medium leading-none">{user.data?.username}</p>
												<p className="text-xs leading-none text-muted-foreground">
													{user.data?.email}
												</p>
											</div>
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuGroup>
											<DropdownMenuItem onClick={() => navigate("profile")}>
												Profile
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => navigate("seller")}>
												Seller
											</DropdownMenuItem>
										</DropdownMenuGroup>
										<DropdownMenuSeparator />
										<DropdownMenuItem onClick={() => {
											localStorage.clear();
											dispatch(authActions.isAuthenticated(false));
											navigate("/challenge");
										}}>
											Log out
										</DropdownMenuItem>
									</DropdownMenuContent>

								</DropdownMenu>
							</NavigationMenuItem>
						}

					</NavigationMenuList>
				</NavigationMenu>
			</header>

			<CartSidebar />
		</Sheet >
	)
}

export default Header