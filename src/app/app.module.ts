import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient  } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutesModule } from './app.routes'; 

@NgModule({
  imports: [
    BrowserModule,
    AppRoutesModule // Include your routing module
  ],
  providers: [provideHttpClient()]
})
export class AppModule {}
