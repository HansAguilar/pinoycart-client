import FilterProduct from "@/components/FilterProduct";
import Feed from "@/components/Feed";

const Dashboard = () => {
	return (
		<main className="flex container py-8 gap-9 m-auto border border-red-400">
			<FilterProduct />
			<Feed />
		</main>
	)
}

export default Dashboard