/**
 * Copyright (c) 2020, 2022, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Category } from '../../interfaces/interfaces';

/**
 * The component responsible for rendering the home page.
 *
 * The HomePageDataResolver gets all the data before this component is created.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  categories: Category[];

  /*
   * Set the title in the constructor.
   */
  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
  ) {
    this.titleService.setTitle('Image Gallery');
  }

  /*
   * Get the data from the route, the data was obtained
   * using a resolver before this component was created
   */
  ngOnInit() {
    const data = this.route.snapshot.data.routeData;
    this.categories = data.categories;
  }
}
