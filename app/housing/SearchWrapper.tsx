import Search from "../components/Search/search"
import { SearchResultsLS } from "../util/model"

export const SearchWrapper = () => {
    const onSearch = (searchQuery: any) => {
        
        let dispatchedElements = [document.querySelector("#map"), document.querySelector(".houses-section")]

        dispatchedElements.forEach((el) => {
            el?.dispatchEvent(new CustomEvent(SearchResultsLS, {
                detail: {
                    searchQuery: searchQuery,
                },
                composed: true,
                bubbles: true,
    
            }))
        })

    }

    return <Search onSearch={onSearch}/>
}