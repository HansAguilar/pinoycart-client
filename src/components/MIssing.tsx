import { useNavigate } from 'react-router-dom'

const MIssing = () => {
    const navigate = useNavigate();

    return (
        <main className="flex flex-col items-center container py-8 m-auto gap-2 max-lg:flex-col w-full">
            <p className='text-4xl font-medium'>404, there's nothing here 😅</p>
            <p className='text-xl text-primary underline cursor-pointer' onClick={() => navigate("/")}>Continue shopping</p>
        </main>
    )
}

export default MIssing