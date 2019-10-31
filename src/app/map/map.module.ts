import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class MapModule { }
