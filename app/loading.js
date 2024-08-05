const Loading = () => {
    return (
        <div className="flex flex-col bg-gray-950 justify-center h-screen items-center">
            <span className="loading loading-ring loading-lg"></span>
            <div className="text-sm mt-4">loading...</div>
        </div>
    )
}

export default Loading