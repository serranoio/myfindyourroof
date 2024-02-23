"use client"
import { useEffect, useState } from "react";
import Map from "./Map/Map";
import "./housing.css"
import Card from "../components/Card/card";
import { House, HousingDataLS, MarkerClicked, SearchResultsLS, SelectedHouse, filterSearchResultsOnQuery, getHouseFromHouses, getHousingData, getSelectedHouse } from "../util/model";
import Image from "next/image";
import supabase from "../config/supabaseClient";


export const HousesGrid: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([])

    
  
  useEffect(() => {
      document.addEventListener(MarkerClicked, function(e: any) {
          const coords = e.detail.event.latlng;
          getHouseFromHouses(coords);
      });

      document.querySelector(".houses-section")!
      .addEventListener(SearchResultsLS, function(e : any) {
        const searchQuery = e.detail.searchQuery;

      let cur = filterSearchResultsOnQuery(searchQuery)
      setHouses(cur)

      })

      
  const callHousingData = async () => {
    let housesJSON = localStorage.getItem(HousingDataLS)!;
    let houses = JSON.parse(housesJSON);
    if (!houses) {
      let { data: housingData, error } = await supabase 
      .from('HousingData')
      .select('*')
  
      if (error != null) {
        console.log(new Error("Error in fetching housing data from supabase"))
        return;
      } 

      houses = housingData;
    }        

    setHouses(houses)
    localStorage.setItem(HousingDataLS, JSON.stringify(houses));
    localStorage.setItem(SearchResultsLS, JSON.stringify(houses));
    } 

    callHousingData();
}, [])

const getBackgroundColor = (key: number): string => {
    if (key %4 === 0) {
        return "--primary"
    } else if (key %4 === 1) {
        return "--secondary"
    } else if (key %4 === 2) {
        return "--tertiary"
    }
    
    return "--infoColor"
}

const getColor = (key: number): string => {
    if (key % 4 === 0) {
        return "--gray30"
    } else if (key % 4 === 1) {
        return "--gray92"
    } else if (key % 4 === 2) {
        return "--gray92"
    }
    
    return "--gray92"
}

  const getShadow = (key: number): string =>  {
    return "";
  }

  const cardClickHandler = (e: any) => {
    const li = e.target.closest("li") ? e.target.closest("li") : e.target;
    if (li.nodeName !== "LI") return
    
    const selectedHouseNumber: number = li.dataset.house;
    const selectedHouse = houses[selectedHouseNumber];

    document.querySelector(".drawer")!.dispatchEvent(new CustomEvent(MarkerClicked, {
      detail: {
        event: {
          latlng: {
            lat: selectedHouse.lat,
            lng: selectedHouse.lon
          }
        }
      },
      composed: true,
      bubbles: true 
    }
    
    ))

  }

  return (
      <div className="houses-section">
        <ul onClick={cardClickHandler}>
        {houses.map((house, key) => {
          return <li key={key} data-house={key} style={{
            backgroundColor: `var(${getBackgroundColor(key)})`,
            color: `var(${getColor(key)})`,
            boxShadow: getShadow(key) 
          }}>
          <Card>
              {
                <div className="card-content">
                <Image 
                src={`/house${(key) % 4}.png`}
                alt="drawing of house"
                style={{
                  width: "auto",
                  height: "80%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                }}
                width="100"
                height="100"
                />
                <p>{house.address}</p>
                </div>  
                }
            </Card>
          </li>
        })}
        </ul>
      </div>
  );
}
