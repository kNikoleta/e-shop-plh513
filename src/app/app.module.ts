import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutesModule } from './app.routes'; 

@NgModule({
  imports: [
    BrowserModule,
    AppRoutesModule // Include your routing module
  ],
  providers: []
})
export class AppModule {}
