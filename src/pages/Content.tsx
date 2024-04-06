import FilterProduct from "@/components/mainPage/FilterProduct";
import Feed from "@/components/mainPage/Feed";

const Content = () => {
	return (
		<main className="flex container relative my-16 py-8 m-auto gap-2 max-xl:flex-col w-full">
			<FilterProduct />
			<Feed />
		</main>
	)
}

export default Content