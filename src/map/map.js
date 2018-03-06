import 'leaflet/dist/leaflet.css';
import '../../styles/map.css';

import FileUploader from '../fileUploader/uploader';
import L from 'leaflet';


export default class Map {
    constructor(id, center, zoom = 13, geoJSONObj = null) {
        this.map = L.map(id).setView(center, zoom);

        this.geoJSONObj = geoJSONObj;
        this.data = localStorage.getItem(FileUploader.STORAGE_KEY);
        this.uploader = new FileUploader('btn-upload-file', this.load.bind(this));

        this.paint();
    }

    paint() {
        if (this.geoJSONObj) this.loadGeoJSON(this.geoJSONObj);
        if (this.data) this.load(JSON.parse(this.data));
        this.initialize_tiles();
    }

    loadGeoJSON(geoJSON) {
        this.geoJSON = L.geoJSON(geoJSON);
        this.geoJSON
            .setStyle({
                color: 'var(--main-color)'
            }).addTo(this.map);
        this.map.fitBounds(this.geoJSON.getBounds());
    }


    initialize_tiles() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(this.map);
    }

    load(data) {
        let layers_to_add_info = Object.values(this.geoJSON._layers)
            .filter(e => Object.keys(data).indexOf(e.feature.properties.name) > -1);
        for (let layer of layers_to_add_info)
            layer.setStyle({
                color: 'var(--secondary-color)'
            }).bindPopup(data[layer.feature.properties.name]).openPopup();
    }
}
