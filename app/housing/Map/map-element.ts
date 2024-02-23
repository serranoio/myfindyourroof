import { CSSResultGroup, LitElement, PropertyValueMap, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
// @ts-ignore
import L from 'leaflet'
import {House, HouseMarker, MarkerClicked, SearchResultsLS, filterSearchResultsOnQuery, getHousingData, getSearchedHouses} from "../../util/model"

@customElement('map-element')
export class MapElement extends LitElement {

    @property()
    hasInitialized: boolean = false;

    @property()
    markerReferences: any = [];

    @property()
    searchResults: HouseMarker[] = [];

    @property()
    couldNotLoadMap: boolean = false;

    @property()
    loading: boolean = true;

    @property()
    map: any;

setMarkersOnMap(currentSearchResults: House[]) {
    // console.log(currentSearchResults)

    currentSearchResults.forEach((searchResult: House) => {

        // console.log(searchResul)

        this.searchResults.forEach((house: HouseMarker) => {
            if (searchResult.lat === house.lat &&
            searchResult.lon === house.lon) {
                house.marker.addTo(this.map)
                // house.marker = this.addAMarkerToMap(house.lat, house.lon)
            } else {
                // this.map.removeLayer(house.marker)
            }

        
        })

    })

    // this.requestUpdate();

}

removeAllMarkers() {
    this.searchResults.forEach((house: HouseMarker) => {
        if (this.map.hasLayer(house.marker)) {
            this.map.removeLayer(house.marker);
        }    
    })
}

listenForSearchQuery(e: any) {
    let currentResults = filterSearchResultsOnQuery(e.detail.searchQuery)
    this.removeAllMarkers()
    this.setMarkersOnMap(currentResults);
    this.requestUpdate();
}

constructor() {
super()
document.addEventListener(SearchResultsLS, this.listenForSearchQuery.bind(this));
}

createRenderRoot() {
    return this;
}



async getYourLocation(): Promise<GeolocationPosition> {
    

    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(function (position) {
            resolve(position)
        }, function() {
            reject("Could not get location")
        });
        
    })
}

createMap(coords: {lat: number, lon: number}) {
    if (this.map) {
        this.map.remove();
    }
    
    this.map = L.map('map').setView([coords.lat, coords.lon], 13);
    
    // add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(this.map);
}

fetchSearchResults() {
    const resultsJSON = localStorage.getItem(SearchResultsLS)!
    this.searchResults = JSON.parse(resultsJSON)
}

clickedMarker(e: any) {
    this.dispatchEvent(new CustomEvent(MarkerClicked, {
        detail: {
            event: e
        },
        composed: true,
        bubbles: true
    }))
}


createPopupContent(e: any) {
    var popup = L.popup()
    .setContent('<img class="house-image-on-map" src="house-temp.jpg"/>')

    return popup
}

markerHovered(e: any, markerReference: any) {
markerReference.bindPopup(this.createPopupContent(e)).openPopup();
}

addAMarkerToMap(lat: number, lon: number) {
        let marker = L.marker({lat: lat, lon: lon}, {
            riseOnHover: true
        });

        marker
        .addTo(this.map).on('click', this.clickedMarker.bind(this))
        .on('mouseover',(e: any) => {
            this.markerHovered(e, marker);
        })

    return marker;
}

addMarkersToMap() {
    this.searchResults.forEach((searchResult: HouseMarker) => {
        searchResult.marker = this.addAMarkerToMap(searchResult.lat, searchResult.lon);
    })


}

async initialize() {
    let location: GeolocationPosition;
    try {
        location  = await this.getYourLocation();
        this.createMap({lat: location.coords.latitude, lon: location.coords.longitude});
        this.fetchSearchResults();
        this.addMarkersToMap();
    } catch {
        this.couldNotLoadMap = true;
    } finally {
        this.loading = false;
    }

}

protected firstUpdated(): void {
    if (!this.hasInitialized) {
        this.initialize();
        this.hasInitialized = true;
    }
    
}

render() {
    return html`
    <div id="map">
    ${this.couldNotLoadMap ? html`<p class="position-center">Could not get your location!</p>` : ""}
    ${this.loading ? html`<div class="lds-ripple"><div></div><div></div></div>` : ""}
    </div>`
}
}