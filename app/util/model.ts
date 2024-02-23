export interface House {
    address: string,
    createdAt: string,
    id: string,
    lat: number,
    lon: number,
    listedDate: string,
    listingType: string,
    price: number,
    propertyType: string,
    status: string
}

export interface HouseMarker extends House {
    marker: any;
    address: string,
    createdAt: string,
    id: string,
    lat: number,
    lon: number,
    listedDate: string,
    listingType: string,
    price: number,
    propertyType: string,
    status: string
}

export const HousingDataLS = "housing-data";
export const SearchResultsLS = "search-results";
export const MarkerClicked = "marker-clicked";
export const SelectedHouse = "selected-house";

export const getSelectedHouse = (): House => {
    return JSON.parse(localStorage.getItem(SelectedHouse)!)
}

export const filterSearchResultsOnQuery = (searchQuery: string): House[] => {
    let allResults: House[] = getHousingData();

    console.log(allResults)
    
    let filters = JSON.parse(localStorage.getItem("filters")!);
    
    console.log(filters)

    allResults = allResults.filter((result: House) => {
        const wordExists = result.address
        .split(" ")
        .map((word: string) => {
            return word.includes(searchQuery) ? true : false 
        })
        .includes(true) 


        if (wordExists &&
            result.price > filters.min
            && result.price < filters.max
            && (filters.rentalOrBuy === "rent"
            && result.listingType === "rent"
            ||
            filters.rentalOrBuy === "sale"
            && result.listingType === "sale"
        )
        ) {
            return true;
        } 

    return false;
})


    return allResults;
}    

export const getSearchedHouses = (): House[] => {
    return JSON.parse(localStorage.getItem(SearchResultsLS)!)
}

export const getHousingData = (): House[] => {
    return JSON.parse(localStorage.getItem(HousingDataLS)!);
}

export const getHouseFromHouses = (coords: {lat: number, lng: number}): House => {
    let housesJSON = localStorage.getItem(HousingDataLS)!;
    let houses = JSON.parse(housesJSON);
   
    let houseFound: House;
    houses.forEach((house: House) => {
      if (house.lat === coords.lat &&
          house.lon === coords.lng) {
              houseFound = house;
              localStorage.setItem(SelectedHouse, JSON.stringify(houseFound));
              return houseFound
            }
        })
        
        return houseFound!;
}