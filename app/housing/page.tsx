"use client"
import { useEffect, useState } from "react";
import Map from "./Map/Map";
import "./housing.css"
import Card from "../components/Card/card";
import { House, HousingDataLS, MarkerClicked, SearchResultsLS } from "../util/model";
import Image from "next/image";
import Button from "../components/Button/button";
import { HousesGrid } from "./houses";
import { Drawer } from "./Drawer";
import Search from "../components/Search/search";
import { SearchWrapper } from "./SearchWrapper";

export default function Housing() {

  

  return (
    <div className="grid">
      <div className="search-section">
        <SearchWrapper/>
      </div>
      <HousesGrid/>
    <Map/>
    <Drawer/>
    </div>
  );
}
