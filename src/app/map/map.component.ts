import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import { Tile as TileLayer } from 'ol/layer';
import TileWMS from 'ol/source/TileWMS';
import OSM, { ATTRIBUTION } from 'ol/source/OSM';
import sync from 'ol-hashed';
import { HttpClient } from '@angular/common/http';
import WMSCapabilities from 'ol/format/WMSCapabilities';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  formatter = new WMSCapabilities();
  layers;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadMap();
    this.http.get('http://localhost:8080/geoserver/gis_example/wms?request=GetCapabilities',
      { responseType: 'text' }).subscribe((data: any) => {
        this.layers = this.formatter.read(data).Capability.Layer.Layer;
        console.log(this.layers);
      });
  }

  onRowClicked(item: any): void {
    item.isChecked = !item.isChecked;
    console.log(item);
  }

  loadMap() {

    const vector = new TileLayer({
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/gis_example/wms',
        params: { LAYERS: 'gis_example:gis_example', TILED: true },
        serverType: 'geoserver',
        projection: 'EPSG:4326',
        transition: 0
      })
    });


    const raster = new TileLayer({
      source: new OSM({
        attributions: [
          'All maps © <a href="https://www.opencyclemap.org/">OpenCycleMap</a>',
          ATTRIBUTION
        ],
        url: 'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' +
          '?apikey=dc8a9ee9b94a4856872e2fb768b61ef6'
      })
    });

    const map = new Map({
      layers: [raster, vector],
      target: 'map'
    });

    sync(map);
  }

}
