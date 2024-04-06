import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "../ui/input"
import { Search } from "lucide-react"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"

const FilterProduct = () => {
    const [value, setValue] = useState<number[]>([0]);
    const [showFilterModal, setShowFilterModal] = useState<boolean>(window.innerWidth >= 1024);
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setShowFilterModal(window.innerWidth < 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <div className={`flex-col max-xl:flex-col w-1/4 flex gap-4 max-xl:w-full`}>
            <div className="w-full">
                <div className="flex items-center">
                    <Input type="seach" className="z-30 rounded-l" placeholder="What are you looking for?" />
                    <Button variant="outline" className="rounded-none" size="icon">
                        <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="rounded-none" size="icon" onClick={() => setShowModal(prev => !prev)}>
                        <MixerHorizontalIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {
                showModal &&
                <div className="flex flex-col gap-2">
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
            }
        </div>
    )
}

export default FilterProduct