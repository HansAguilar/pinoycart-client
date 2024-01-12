import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { NavLink } from "react-router-dom"
import { ModeToggle } from "./ui/mode-toggle"
import { Search, ShoppingCart } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const links = [
	{
		title: "new",
		link: "/new"
	},
	{
		title: "women",
		link: "/women"
	},
	{
		title: "men",
		link: "/men"
	},
	{
		title: "kids",
		link: "/kids"
	},
	{
		title: "shoes",
		link: "/shoes"
	},
]

const Header = () => {
	return (
		<header className="bg-secondary">
			<NavigationMenu className="flex items-center justify-between flex-wrap container">
				<h2 className="scroll-m-20 text-3xl font-semibold tracking-tight text-center p-2">
					PinoyCart
				</h2>

				<NavigationMenuList className="flex items-center gap-4 w-full">
					{/* {
						links.map(item => (
							<NavigationMenuItem key={item.title} className="w-full">
								<NavLink to={item.link} className="uppercase w-full hover:text-primary"
									style={({isActive}) => {
										return isActive ? { color: "blue" } : {};
									}}
								>{item.title}</NavLink>
							</NavigationMenuItem>
						))
					} */}

					{/* <div className="flex items-center w-full">
						<Input type="text" placeholder="Search Product" className="min-w-[14rem] bg-accent-foreground text-black" />
						<Button variant="outline" size="icon" className="bg-secondary">
							<Search className="h-4 w-4" />
						</Button>
					</div> */}

					<NavigationMenuItem>
						<NavigationMenuLink>
							<ModeToggle />
						</NavigationMenuLink>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<NavigationMenuLink>
							<ShoppingCart />
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	)
}

export default Header