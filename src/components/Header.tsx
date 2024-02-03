import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "./ui/mode-toggle"
import { ShoppingCart } from "lucide-react"
import { Cross2Icon } from "@radix-ui/react-icons"

import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { NavLink } from "react-router-dom"
import { authActions } from "@/store/features/auth/authSlice"
import { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { getCart } from "@/store/features/cart/cartSlice"
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "./ui/separator"
import CartQuantity from "./CartQuantity"

const Header = () => {
	const user = useAppSelector((state) => state.auth.data)
	const cart = useAppSelector((state: RootState) => state.cart)

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
									<ShoppingCart className="h-5 w-5" />
								</SheetTrigger>
								<div className="absolute top-0 -right-2 h-4 w-4">
									<p className="flex items-center justify-center bg-destructive text-white rounded-full p-1 w-full h-full text-xs">
										{cart.cartItems.length}
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
				<Separator className="mb-4" />
				<SheetHeader>
					<div className="flex items-center justify-center gap-2">
						<SheetTitle>My Cart</SheetTitle>
						<span className="text-sm"> ({cart.cartItems.length})</span>
					</div>
				</SheetHeader>
				<div className="flex flex-col gap-4 my-4">
					{
						cart.cartItems.map((item: any) => (
							<div key={item._id}>
								<div className="rounded-sm flex items-center gap-4">
									<div className="relative">
										<img src={`http://localhost:3000/uploads/${item.itemImages[0]}`} className='min-w-[90px] max-w-[30px]' />
										<div className="bg-secondary absolute -top-2 -left-2 rounded-full p-1 hover:bg-destructive transition-all duration-100 ease-linear cursor-pointer">
											<Cross2Icon className="h-4 w-4" />
										</div>
									</div>

									<div>
										<div>
											<p>{item.itemQuantity}x {item.itemName}</p>
											<p className="text-primary font-medium">₱ {item.itemPrice}</p>
										</div>
										<div className='flex items-center gap-8 mt-auto'>
											<CartQuantity price={item.itemPrice} />
										</div>
									</div>
								</div>
								<Separator className="mt-4" />
							</div>

						))
					}
				</div>

				<div className="flex items-center justify-between">
					<h3 className="text-primary font-medium">TOTAL</h3>
					<p>₱ {cart.total}</p>
				</div>

				<Separator className="mt-4 mb-4" />

				<SheetFooter>
					<SheetClose asChild>
						<Button type="submit">Save changes</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>

		</Sheet >
	)
}

export default Header