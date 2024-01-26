import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "./ui/mode-toggle"
import { ShoppingCart, WineOff } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useAppSelector } from "@/store/hooks"
import { NavLink } from "react-router-dom"

const Header = () => {
	const user = useAppSelector((state) => state.auth.data)

	return (
		<header className="bg-secondary">
			<NavigationMenu className="flex items-center  flex-wrap">
				<h2 className="text-3xl font-semibold tracking-tight text-center p-2">
					<NavLink to="feed">PinoyCart</NavLink>
				</h2>

				<NavigationMenuList >

					<NavigationMenuItem>
						<ModeToggle />
					</NavigationMenuItem>

					<NavigationMenuItem>
						<Button variant="outline" size="icon">
							<ShoppingCart className="h-4 w-4" />
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
									localStorage.clear()
									window.location.href = "/"
								}}>
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</NavigationMenuItem>

				</NavigationMenuList>
			</NavigationMenu>
		</header>
	)
}

export default Header