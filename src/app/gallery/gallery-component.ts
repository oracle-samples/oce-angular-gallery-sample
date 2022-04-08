/**
 * Copyright (c) 2020, 2022, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */

import { Component, Input } from '@angular/core';

import { Category } from '../../interfaces/interfaces';

/**
 * This component renders the gallery for each category and also displays the
 * name of the category and the number of items belonging to the category.
 *
 * This component is used in the HomePage component. All data required for this
 * component is passed in by the HomePage component.
 *
 * @param category the category of the items to display
 * @param itemsThumbnailURLMap the map of item id to item thumbnail url
 */
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery-component.html',
})
export class GalleryComponent {
  @Input() category: Category;
}
