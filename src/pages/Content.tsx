import FilterProduct from "@/components/FilterProduct";
import Feed from "@/components/Feed";

const Content = () => {
	return (
		<main className="flex container py-8 m-auto gap-2 max-lg:flex-col w-full">
			<FilterProduct />
			<Feed />
		</main>
	)
}

export default Content