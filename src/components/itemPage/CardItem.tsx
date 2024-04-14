import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { LucideStar, Minus, Plus } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'


const CardItem = ({ item, quantity, handleAddToCart, vendorInfo, handleQuantity, imgRef, readImageData, ambianceColor }) => {
    return (
        <div className='flex rounded max-md:flex-col max-md:gap-4'>
            <div className='w-2/4 max-md:w-full flex items-center justify-center' style={{ backgroundColor: ambianceColor }}>
                <Carousel>
                    <CarouselContent className='max-h-96'>
                        {
                            item.currentItem?.itemImages?.map((img: string) => {
                                return (
                                    <CarouselItem key={img}>
                                        <img src={`${img}`} alt={`${item.currentItem?.itemName}`} ref={imgRef} onLoad={readImageData} className='h-full m-auto object-contain' />
                                    </CarouselItem>
                                )
                            })
                        }
                    </CarouselContent>
                    <CarouselPrevious className='left-0 bg-secondary' />
                    <CarouselNext className='right-0 bg-secondary' />
                </Carousel>
            </div>

            <div className='w-2/4 max-md:w-full flex flex-col gap-4 px-4 max-md:p-0 '>
                <div>
                    <h3 className='text-2xl uppercase font-semibold'>{item.currentItem?.itemName}</h3>
                    <div className='flex items-center gap-2'>
                        <p className='text-muted-foreground text-sm'>{item.currentItem?.itemStock} stock(s) </p>
                        {item.currentItem?.itemStock < 1 && <p className='text-base font-semibold text-destructive'>Sold Out</p>}
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <h2 className='text-xl line-through text-muted-foreground font-medium'>₱{(item.currentItem?.itemPrice + 10)?.toFixed(2).toLocaleString()}</h2>
                    <h2 className='text-xl text-primary font-medium'>₱{item.currentItem?.itemPrice?.toFixed(2).toLocaleString()}</h2>

                </div>

                <p>{item.currentItem?.itemDesc}</p>

                <Separator className='my-2' />

                <div className='flex flex-col justify-between gap-4'>
                    <div className='flex items-center gap-2'>
                        <img src={`http://localhost:3000/uploads/${vendorInfo.data?.vendorBanner}`} className='aspect-square rounded border w-8 h-8' alt=":)" />
                        <p className='text-sm font-medium text-muted-foreground'>{vendorInfo.data?.vendorName}</p>
                    </div>
                    <div className='flex justify-between gap-4 w-full items-center'>
                        <p className='text-muted-foreground font-medium'>Qty:</p>
                        <div className='flex items-center gap-2'>
                            <Button variant="outline" size="icon" onClick={() => handleQuantity("minus")} disabled={quantity === 1}><Minus /></Button>
                            <p className='font-medium px-4'>{quantity}</p>
                            <Button variant="outline" size="icon" onClick={() => handleQuantity("plus")}><Plus /></Button>
                        </div>
                    </div>
                    <Button className='uppercase' onClick={() => handleAddToCart(item.currentItem?._id!, item.currentItem?.itemStock)}>Add to cart</Button>
                </div>
            </div>
        </div>

    )
}

export default CardItem