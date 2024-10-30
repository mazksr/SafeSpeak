"use client"

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

const SearchField = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace }  = useRouter()
    const params = new URLSearchParams(searchParams)

    const handleSearch = useDebouncedCallback((search: string) => {
        if (search) {
            params.set("search", search)
        } else {
            params.delete("search")
        }
        replace(`${pathname}?${params.toString()}`)
    }, 400)

    function clearSearch() {
        params.delete("search")
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <form>
            <div className={"flex search"}>
                <button>
                    <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
                         aria-labelledby="search">
                        <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                              stroke={"#C8C8C8"}
                              strokeLinejoin="round"></path>
                    </svg>
                </button>
                <input className="focus:outline-none" placeholder="Cari komentar..." required={false} type="text" defaultValue={searchParams.get('search')?.toString()} onChange={(e) => handleSearch(e.target.value)}/>
            </div>
        </form>
    );
};

export default SearchField;