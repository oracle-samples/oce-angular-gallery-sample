/**
 * Copyright (c) 2020, 2022, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */

import { BrowserModule, Title, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery-component';
import { ImageGridComponent } from './image-grid/image-grid-component';

import { HomePageDataResolver } from '../resolvers/home-page-data.resolver';
import { ImageGridDataResolver } from '../resolvers/image-grid-data.resolver';

const appRoutes: Routes = [
  // home page - list of categories in all taxonomies
  {
    path: 'home',
    component: HomeComponent,
    resolve: { routeData: HomePageDataResolver },
  },
  // no path specified, go to home
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  // Grid of images for the selected category
  {
    path: 'category/:categoryId',
    component: ImageGridComponent,
    resolve: { routeData: ImageGridDataResolver },
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GalleryComponent,
    ImageGridComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    RouterModule.forRoot( // <-- debugging purposes only
      appRoutes, { enableTracing: false, initialNavigation: 'enabled' },
    ),
  ],
  providers: [
    Title,
    HomePageDataResolver,
    ImageGridDataResolver,
  ],
  bootstrap: [
    AppComponent,
  ],
})

export class AppModule { }
