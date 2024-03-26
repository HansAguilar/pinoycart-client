import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

export const DeleteModal = ({ handleRemoveItem, selectedItem, setAction }: { handleRemoveItem: any, selectedItem: any, setAction: any }) => {
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete <span className="text-destructive marker:">{selectedItem.itemName}?</span> </AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the item.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setAction("")}>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive hover:bg-destructive/60" onClick={handleRemoveItem}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}