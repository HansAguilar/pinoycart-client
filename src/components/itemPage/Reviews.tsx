import { useState } from 'react';
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { LucideStar, Star, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { toast } from 'sonner';
import { addReview } from '@/store/features/items/itemSlice';

interface IFormInputs {
    rating: number;
    comment: string;
    itemID: string | undefined;
    userID: string | undefined;
}

const StarRating = ({ rating }: { rating: number }) => {
    const totalStars = 5;
    const filledStars = Array.from({ length: rating }).map((_, index) => (
        <Star key={index} className='text-yellow-400' size={16} fill='yellow' />
    ));
    const emptyStars = Array.from({ length: totalStars - rating }).map((_, index) => (
        <Star key={rating + index} className='text-gray-500' size={16} />
    ));

    return (
        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
            {filledStars}
            {emptyStars}
        </div>
    );
};


const Reviews = ({ itemID }: { itemID: string }) => {
    const item = useAppSelector((state: RootState) => state.items);
    const user = useAppSelector((state: RootState) => state.auth.data);
    const dispatch = useAppDispatch();

    const [sendData, setSendData] = useState<IFormInputs>({
        comment: "",
        rating: 0,
        itemID: itemID,
        userID: user?._id
    });

    const [reviewLikes, setReviewLikes] = useState<number>(0);

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (!sendData.comment || !sendData.rating) {
            return toast.error("Fill up all fields", { duration: 2000 })
        }
        toast.success("Review Added", { duration: 2000 })
        dispatch(addReview(sendData));
    }

    return (
        <article>
            <Dialog>
                {
                    <DialogContent className='max-h-[28rem]'>
                            <DialogHeader>
                                <DialogTitle>Add a review</DialogTitle>
                                <DialogClose className="border-none absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                                    <Cross2Icon className="h-4 w-4" />
                                    <span className="sr-only">Close</span>
                                </DialogClose>
                                <DialogDescription>
                                    Once submitted, your review cannot be edited or removed.
                                </DialogDescription>
                            </DialogHeader>


                            <form className="grid gap-6">
                                <div className="flex flex-col gap-2 w-full ">
                                    <label className='font-medium text-slate-500 text-sm' htmlFor="rating">Rating</label>
                                    <div className="flex items-center gap-2 justify-center">
                                        {[1, 2, 3, 4, 5].map((index) => (
                                            <LucideStar
                                                key={index}
                                                size={30}
                                                strokeWidth={1}
                                                fill={sendData.rating >= index ? "yellow" : "transparent"}
                                                className="text-yellow-300 hover:text-yellow-500 cursor-pointer transition-all ease-linear duration-150"
                                                onClick={() => setSendData(prev => ({ ...prev, rating: index }))} // Update rating
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 w-full">
                                    <label className='font-medium text-slate-500 text-sm max-w-max' htmlFor="review">Review</label>
                                    <div className={`relative transition-all duration-300 h-32 border`}>
                                        <textarea
                                            className="absolute top-0 left-0 w-full outline-none bg-transparent p-2 text-sm resize-none"
                                            id="review"
                                            rows={5}
                                            placeholder="Add a review"
                                            name='comment'
                                            onChange={(e) => setSendData(prev => ({ ...prev, comment: e.target.value }))}
                                        ></textarea>
                                    </div>

                                </div>
                                <Button type="submit" className='max-w-max ml-auto' onClick={(e) => onSubmit(e)}>Submit</Button>
                            </form>
                    </DialogContent>
                }

                <p className="font-medium py-4">Product Reviews</p>

                {
                    item.currentItem?.itemReviews && item.currentItem?.itemReviews.length > 0 ?
                        item.currentItem?.itemReviews.map(review => (
                            <div className='bg-secondary p-4 border'>
                                <div className="flex items-start font-medium justify-between">
                                    <div className="flex items-center mb-4 font-medium">
                                        <Avatar className='w-10 h-10 me-4 rounded-full'>
                                            <AvatarImage src={`https://ui-avatars.com/api/?name=${review.userID.username?.substring(0, 2)}&background=6225c5&color=fff`} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <p>{review.userID.username} <time dateTime="2014-08-16 19:00" className="block text-sm text-gray-500 dark:text-gray-400">{new Date(review.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time></p>
                                    </div>
                                    <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                        <StarRating rating={review.rating} />
                                    </div>
                                </div>

                                <p className="mb-2 text-gray-500">{review.comment}</p>

                                <aside>
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            <Button variant="ghost" className='group' size="icon" onClick={() => setReviewLikes(review.likes + 1)}>
                                                <ThumbsUp size={18} className={`text-gray-500 max-w-max group-hover:text-primary ${review.isLiked && "text-primary"} cursor-pointer`} />
                                            </Button>
                                            <p className="mt-1 font-medium text-xs text-gray-500"> {reviewLikes > 0 ? reviewLikes : review.likes} people found this helpful</p>
                                        </div>

                                        <a href="#" className="ps-4 text-xs font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-600 ms-4 border-s md:mb-0">Report abuse</a>
                                    </div>
                                </aside>
                            </div>

                        ))
                        :
                        <div className="rounded p-10 opacity-80 bg-secondary">
                            <div className='flex items-center flex-col z-20'>
                                <h2 className="text-xl font-semibold text-gray-500">No Reviews Yet</h2>
                                <p className="text-gray-600 mb-2">We don't have any reviews for this product yet.</p>
                                {
                                    user?.orders.includes(itemID) && <DialogTrigger className='max-w-max bg-primary px-4 py-2 rounded'>Add a review</DialogTrigger>
                                }
                            </div>

                        </div>
                }
            </Dialog >
        </article >
    );
};

export default Reviews;
