import { MagnifyingGlass } from "@phosphor-icons/react";

export default function TopSearch () {
    return (
    <form className="relative w-screen max-w-xl mx-6">

        <input
            className="w-full py-2 px-5 rounded-full border border-white bg-transparent placeholder-white placeholder-opacity-50 focus:outline-none focus:border-slate-800 focus:bg-slate-900"
            type="text"
            placeholder="Search your movie..."
        />
        <button type="submit" className="absolute top-0 right-0 p-2 pr-4 text-white">
        <MagnifyingGlass size={24} weight="bold" />
        </button>
    </form>
    )
}