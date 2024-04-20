import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import axios from 'axios'

const formSchema = z.object({
	username: z.string().min(3, {
		message: "Username should be atleast 3 characters",
	}),
	password: z.string().min(1, {
		message: "Please enter your password"
	}),
	cpassword: z.string().min(1, {
		message: "Please enter your password"
	}),
}).refine((data) => data.password === data.cpassword, {
	message: "Passwords don't match",
	path: ["cpassword"], // path of error
});

const Signup = () => {
	const [errorMessage, setErrorMessage] = useState<string>("");

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
			cpassword: "",
		}
	})
	const { formState } = form;

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const response = await axios.post("http://localhost:3000/api/v1/user/register", values)
			window.location.reload();
			setErrorMessage("");
		}
		catch (error: any) {
			setErrorMessage(error.response.data.message)
		}
	}

	return (
		<>
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">Create new account</CardTitle>
				<p className="leading-7 [&:not(:first-child)]:mt-6 text-destructive font-medium">
					{errorMessage}
				</p>
			</CardHeader>

			<CardContent className="grid gap-4">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField control={form.control} name="username" render={({ field }) => (
							<FormItem className="flex flex-col items-start">
								<FormLabel>Username</FormLabel>
								<FormControl><Input {...field} /></FormControl>
								<FormMessage />
							</FormItem>
						)} />

						<FormField control={form.control} name="password" render={({ field }) => (
							<FormItem className="flex flex-col items-start w-full">
								<FormLabel>Password</FormLabel>
								<FormControl><Input type='password' {...field} /></FormControl>
								<FormMessage />
							</FormItem>
						)} />

						<FormField control={form.control} name="cpassword" render={({ field }) => (
							<FormItem className="flex flex-col items-start w-full">
								<FormLabel>Confirm password</FormLabel>
								<FormControl><Input type='password' {...field} /></FormControl>
								<FormMessage />
							</FormItem>
						)} />

						{
							!formState.isSubmitting ?
								<Button className="w-full">
									Signup
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
		</>
	)
}

export default Signup