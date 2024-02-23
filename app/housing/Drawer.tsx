import { useEffect, useState } from "react"
import { House, MarkerClicked, getHouseFromHouses } from "../util/model";
import Image from "next/image";

export const Drawer = () => {

    const [selectedHouse, setSelectedHouse] = useState<House>();

    useEffect(() => {
        document.addEventListener(MarkerClicked, function(e: any) {
          const coords = e.detail.event.latlng;
        const house = getHouseFromHouses(coords)
        setSelectedHouse(house)
        })
    })
    
    const deselectHouse = (e: any) => {
        if (!e.target.classList.contains("close-button") && 
        (e.target.classList.contains("drawer") ||
        e.target.closest(".drawer"))) {
          return; 
        }

      setSelectedHouse(undefined);
    }

    return <div onClick={deselectHouse} className={`shadow  ${selectedHouse ? "open" : ""}`}>

      <div className={`drawer ${selectedHouse ? "open" : ""}`}>
      <div className="padding">

        <Image
          src={`/house-temp.jpg`}
          alt="temp image of a house"
          style={{
            width: "60%",
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
          }}
          width="100"
          height="100"
        />
        <div className="price-address">
        <p className="price">{selectedHouse?.price}$</p>
      <p className="address">{selectedHouse?.address}</p>
        </div>
        <div className="listing">
        <p>{selectedHouse?.listingType}</p> 
        <p>Since {selectedHouse?.listedDate.split("T")[0]}</p> 
          <div className="status" style={{
            backgroundColor: `var(${selectedHouse?.status === "Active" ? "--successColor" : "--warningColor"})`
          }}></div>
        </div>
      </div>

      <button className="close-button" onClick={deselectHouse}>x</button>
      </div>
      
    </div>
}