import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Pipes
import { PipesModule } from '../pipes/pipes.module';

//Plugins
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyBw4d1hMJypGdapwRrleiJzKe6OlTtxHv4",
  authDomain: "gag-f0213.firebaseapp.com",
  databaseURL: "https://gag-f0213.firebaseio.com",
  projectId: "gag-f0213",
  storageBucket: "gag-f0213.appspot.com",
  messagingSenderId: "454122775587"
};

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubirPage } from '../pages/subir/subir';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubirPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubirPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    ImagePicker,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
