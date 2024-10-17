// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

const updatedAppConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // Include existing providers if any
    provideHttpClient() // Add provideHttpClient to the providers
  ]
};

bootstrapApplication(AppComponent, updatedAppConfig)
  .catch((err) => console.error(err));
