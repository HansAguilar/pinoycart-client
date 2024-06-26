import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "../ui/mode-toggle"
import { ShoppingCart } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Link, useNavigate } from "react-router-dom"
import { authActions, getUserByID } from "@/store/features/auth/authSlice"
import { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import CartSidebar from "./CartSidebar"

const Header = () => {
	const user = useAppSelector((state) => state.auth)
	const cart = useAppSelector((state: RootState) => state.cart)

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [cartLength, setCartLength] = useState<number>(0);

	useEffect(() => {
		if (!user.isLogged) {
			const getCartFromLocalStorage = localStorage.getItem('cart');
			if (getCartFromLocalStorage) {
				const localCartLength = JSON.parse(getCartFromLocalStorage);
				setCartLength(localCartLength.length)
			}
		}

		else {
			dispatch(getUserByID(user.data?._id!));
		}

	}, [user.isLogged, cartLength, JSON.parse(localStorage.getItem('cart')!)?.length])

	return (
		<Sheet>
			<header className="bg-secondary/30 fixed w-full z-50 backdrop-blur-3xl min-h-[2rem]">
				<NavigationMenu className="flex items-center flex-wrap">
					<h2 className="text-3xl font-semibold tracking-tight text-center p-2 cursor-pointer" onClick={() => navigate("/")}>
						PinoyCart
					</h2>

					<NavigationMenuList >

						<NavigationMenuItem>
							<ModeToggle />
						</NavigationMenuItem>

						<NavigationMenuItem>
							<Button variant="outline" size="icon" className="relative border-none">
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
							user.isLogged && user.data ?
								<NavigationMenuItem>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" className="hover:bg-transparent">
												<Avatar>
													<AvatarImage src={`https://ui-avatars.com/api/?name=${user.data?.username.charAt(0)}&background=6225c5&color=fff`} />
													<AvatarFallback>CN</AvatarFallback>
												</Avatar>
											</Button>
										</DropdownMenuTrigger>

										<DropdownMenuContent className="w-56" align="end" forceMount>
											<DropdownMenuLabel className="font-normal">
												<div className="flex flex-col space-y-1">
													<p className="text-sm font-medium leading-none">{user.data?.username}</p>
												</div>
											</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuGroup>
												<DropdownMenuItem onClick={() => navigate("settings")}>
													Settings
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
								:
								<NavigationMenuItem>
									<Link to="/challenge" className="ml-6">
										<Button variant="default">Login</Button>
									</Link>
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