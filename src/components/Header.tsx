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
import { useAppSelector } from "@/store/hooks"

const Header = () => {
	const user = useAppSelector((state) => state.auth.data)
	return (
		<header className="bg-secondary">
			<NavigationMenu className="flex items-center justify-between flex-wrap container">
				<h2 className="scroll-m-20 text-3xl font-semibold tracking-tight text-center p-2">
					PinoyCart
				</h2>

				<NavigationMenuList className="flex items-center w-full">

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
										<AvatarImage src="https://github.com/shadcn.png" className="" />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>

							<DropdownMenuContent className="w-56" align="end" forceMount>
								<DropdownMenuLabel className="font-normal">
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-medium leading-none">shadcn</p>
										<p className="text-xs leading-none text-muted-foreground">
											m@example.com
										</p>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										Profile
									</DropdownMenuItem>
									<DropdownMenuItem>
										Billing
									</DropdownMenuItem>
									<DropdownMenuItem>
										Settings
									</DropdownMenuItem>
									<DropdownMenuItem>New Team</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
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