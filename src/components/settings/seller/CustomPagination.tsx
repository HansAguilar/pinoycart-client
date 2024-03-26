import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface IPaginationProps {
    totalPages: number; // Total of pages (eg. Prev 1, 2, 3, 4 ... Next)
    handlePageChange: (pageNumber: number) => void; // Callback function for page change
    setCurrentPage: (pageNumber: number) => void; // Callback function for page change
    currentPage: number;
}

const CustomPagination = ({ totalPages, handlePageChange, setCurrentPage, currentPage }: IPaginationProps) => {
    const onHandlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        handlePageChange(pageNumber);
    };

    const handleNextAndPrevPage = (action: "next" | "prev") => {
        switch (action) {
            case "next":
                if (currentPage < totalPages) {
                    setCurrentPage(currentPage + 1);
                }
                break;

            case "prev":
                if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                }
                break;

            default:
                break;
        }
    };

    return (
        <Pagination className='mt-4'>
            <PaginationContent>
                <PaginationItem className="cursor-pointer">
                    <PaginationPrevious onClick={() => handleNextAndPrevPage("prev")} />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem className="cursor-pointer" key={index}>
                        <PaginationLink onClick={() => onHandlePageChange(index + 1)} isActive={index + 1 === currentPage}>
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem className="cursor-pointer">
                    <PaginationNext onClick={() => handleNextAndPrevPage("next")} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default CustomPagination;
