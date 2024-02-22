import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

import Login from "./Login"
import Signup from "./Signup"
import { TabsContent } from "@radix-ui/react-tabs"
import { useNavigate } from "react-router-dom"

const Authentication = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex items-center max-w-md mx-auto flex-col justify-center gap-2">
			<Card className="w-full">
				<Tabs defaultValue="Login">
					<TabsList className="w-full">
						<TabsTrigger value="Login" className="w-full">Login</TabsTrigger>
						<TabsTrigger value="Signup" className="w-full">Signup</TabsTrigger>
					</TabsList>

					<TabsContent value="Login">
						<Login />
					</TabsContent>
					<TabsContent value="Signup">
						<Signup />
					</TabsContent>
				</Tabs>
			</Card>
			<p className="underline text-primary cursor-pointer" onClick={() => navigate("/")}>Browse Items</p>
		</div>
	)
}

export default Authentication