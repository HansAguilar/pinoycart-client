import { useState } from 'react';
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { LucideStar } from 'lucide-react';

const Reviews = () => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <Dialog>
            <DialogTrigger className='max-w-max bg-primary px-4 py-2 rounded'>Add a review</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <div>
                        <DialogTitle>Add a review</DialogTitle>
                        <DialogClose className="border-none absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <Cross2Icon className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                    </div>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div>
                        <p className='text-slate-500 text-sm'>Select your rating</p>
                        <div className="flex items-center gap-2">
                            <LucideStar size={24} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                            <LucideStar size={24} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                            <LucideStar size={24} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                            <LucideStar size={24} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                            <LucideStar size={24} strokeWidth={1} fill="yellow" className="text-yellow-300" />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                <div className={`relative transition-all duration-300 ${isFocused ? 'h-32' : 'h-10'} border`}>
                    <textarea
                        className="absolute top-0 left-0 w-full outline-none bg-transparent p-2 text-sm resize-none"
                        name=""
                        id=""
                        rows={isFocused ? 5 : 0}
                        placeholder="Add a review"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    >
                    </textarea>
                </div>
            </div>
                </div>

                <DialogFooter className='flex items-center flex-row gap-4 justify-end'>
                    <Button type="submit">Submit</Button>
                </DialogFooter>
            </DialogContent>

            <p className="text-sm">Product Reviews</p>

            <div className='flex flex-col gap-2'>
                <div className={`relative transition-all duration-300 ${isFocused ? 'h-32' : 'h-10'} border`}>
                    <textarea
                        className="absolute top-0 left-0 w-full outline-none bg-transparent p-2 text-sm resize-none"
                        name=""
                        id=""
                        rows={isFocused ? 5 : 0}
                        placeholder="Add a review"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    >
                    </textarea>
                </div>
            </div>
        </Dialog >
    );
};

export default Reviews;
