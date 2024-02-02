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
import { NavLink } from "react-router-dom"
import { authActions } from "@/store/features/auth/authSlice"
import { RootState } from "@/store/store"
import { useEffect } from "react"
import { getCart } from "@/store/features/cart/cartSlice"
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
const Header = () => {
	const user = useAppSelector((state) => state.auth.data)
	const cartItems = useAppSelector((state: RootState) => state.cart.cartItems)

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getCart());
	}, [])

	return (
		<Sheet>
			<header className="bg-secondary">
				<NavigationMenu className="flex items-center  flex-wrap">
					<h2 className="text-3xl font-semibold tracking-tight text-center p-2">
						<NavLink to="items">PinoyCart</NavLink>
					</h2>

					<NavigationMenuList >

						<NavigationMenuItem>
							<ModeToggle />
						</NavigationMenuItem>

						<NavigationMenuItem>
							<Button variant="outline" size="icon" className="relative">
								<SheetTrigger asChild>
									<Button variant="outline" size="icon"><ShoppingCart className="h-5 w-5" /></Button>
								</SheetTrigger>
								<div className="absolute top-0 -right-2 h-4 w-4">
									<p className="flex items-center justify-center bg-destructive text-white rounded-full p-1 w-full h-full text-xs">
										{cartItems.length}
									</p>
								</div>
							</Button>
						</NavigationMenuItem>

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
											<p className="text-sm font-medium leading-none">{user?.username}</p>
											<p className="text-xs leading-none text-muted-foreground">
												{user?.email}
											</p>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<NavLink to="profile">
											<DropdownMenuItem>
												Profile
											</DropdownMenuItem>
										</NavLink>
										<NavLink to="seller">
											<DropdownMenuItem>
												Seller
											</DropdownMenuItem>
										</NavLink>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={() => {
										localStorage.clear();
										dispatch(authActions.isAuthenticated(false));
										window.location.href = "/";
									}}>
										Log out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</NavigationMenuItem>

					</NavigationMenuList>
				</NavigationMenu>
			</header>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you're done.
					</SheetDescription>
				</SheetHeader>
				<SheetFooter>
					<SheetClose asChild>
						<Button type="submit">Save changes</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>

		</Sheet>
	)
}

export default Header