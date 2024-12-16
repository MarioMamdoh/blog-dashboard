import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { routes } from './app.routes';
import { firebaseConfig } from './constants/constant';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([AngularFireModule.initializeApp(firebaseConfig)]),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFirestore,
    BrowserAnimationsModule,
    provideAnimations(),
    provideToastr(),
    provideFirebaseApp(
      () => initializeApp(firebaseConfig),
      provideStorage(() => getStorage())
    ),
    AngularEditorModule,
    HttpClientModule,
    BrowserModule,
  ],
};
