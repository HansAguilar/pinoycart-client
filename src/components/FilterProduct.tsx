import { useState } from "react"
import { Button } from "./ui/button"
import { Slider } from "@/components/ui/slider"

const FilterProduct = () => {
    const [value, setValue] = useState<number[]>([0])

    return (
        <div className="w-1/5 max-lg:hidden flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold tracking-tight">Filter by</h3>
                <Button variant="secondary">Clear All</Button>
            </div>
            <div className="px-3 py-2 border">
                <h2 className="mb-2 text-lg font-semibold tracking-tight">
                    Product Type
                </h2>
                <div className="space-y-1">
                    <Button variant="secondary" className="w-full justify-start">
                        Men
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        Women
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        Kids
                    </Button>
                </div>
            </div>
            <div className="px-3 py-2 border">
                <div className="flex items-center justify-between">
                    <h2 className="mb-2 text-lg font-semibold tracking-tight">
                        Price
                    </h2>
                    <p className="text-lg font-medium">{value}</p>
                </div>

                <Slider defaultValue={value} max={100} step={1} onValueChange={setValue} />
            </div>
        </div>
    )
}

export default FilterProduct