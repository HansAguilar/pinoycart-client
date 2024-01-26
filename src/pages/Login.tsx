import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"
import { TabsContent } from "@/components/ui/tabs"
import { useAppSelector } from "@/store/hooks"
import { useEffect, useState } from "react"
import { loginAPI } from "@/api/authApi"
import { RootState } from "@/store/store"

const formSchema = z.object({
	username: z.string().min(1, {
		message: "Please enter your username",
	}),
	password: z.string().min(1, {
		message: "Please enter your password"
	}),
})

const Login = () => {
	const [errorMsg, setErrorMsg] = useState<string>("");
	const userAuth = useAppSelector((state: RootState) => state.auth)
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: ""
		}
	})

	const { formState } = form;

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const response = await loginAPI(values);

			if (response.status === 200) {
				localStorage.setItem("token", response.data.token)
				navigate("/user/feed");
				setErrorMsg("")
			}
			else {
				setErrorMsg("Username or password is incorrect")
			}
		}
		catch (error: any) {
			console.log(userAuth)
		}
	}

	useEffect(() => {
		localStorage.clear();
	}, [])

	return (
		<TabsContent value="Login">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">Login your account</CardTitle>
				<p className="leading-7 [&:not(:first-child)]:mt-6 text-destructive font-medium">
					{errorMsg}
				</p>
			</CardHeader>

			<CardContent className="grid gap-4">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField control={form.control} name="username" render={({ field }) => (
							<FormItem className="flex flex-col items-start">
								<FormLabel>Username</FormLabel>
								<FormControl><Input placeholder="Enter your username" {...field} /></FormControl>
								<FormMessage />
							</FormItem>
						)} />

						<FormField control={form.control} name="password" render={({ field }) => (
							<FormItem className="flex flex-col items-start">
								<FormLabel>Password</FormLabel>
								<FormControl><Input placeholder="Enter your password" {...field} type="password" /></FormControl>
								<FormMessage />
							</FormItem>
						)} />

						{
							!formState.isSubmitting ?
								<Button className="w-full">
									Login
								</Button>
								:
								<Button disabled className="w-full">
									<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
									Please wait
								</Button>
						}
					</form>
				</Form>

				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-6">
					<Button variant="outline">
						Github
					</Button>
					<Button variant="outline">
						Google
					</Button>
				</div>
			</CardContent>
		</TabsContent>
	)
}

export default Login