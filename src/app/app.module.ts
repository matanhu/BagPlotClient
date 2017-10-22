import { NewProjectItemPage } from '../pages/new-project-item/new-project-item';
import { HttpModule } from '@angular/http';
import { NewProjectPage } from '../pages/new-project/new-project';
import { ProjectlistPage } from '../pages/projectlist/projectlist';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Camera } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CustomerProvider } from '../providers/customer/customer';
import { ProjectProvider } from '../providers/project/project';
import { ContactProvider } from '../providers/contact/contact';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { ProjectItemPage } from '../pages/project-item/project-item';
import { ProjectPage } from '../pages/project/project';
import { ProjectItemProvider } from '../providers/project-item/project-item';
import { EditProjectItemPage } from '../pages/edit-project-item/edit-project-item';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProjectlistPage,
    NewProjectPage,
    ProjectPage,
    ProjectItemPage,
    EditProjectItemPage,
    NewProjectItemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProjectlistPage,
    NewProjectPage,
    ProjectPage,
    ProjectItemPage,
    EditProjectItemPage,
    NewProjectItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CustomerProvider,
    ProjectProvider,
    ContactProvider,
    Camera,
    Keyboard,
    FirebaseProvider,
    ProjectItemProvider
  ]
})
export class AppModule {}
