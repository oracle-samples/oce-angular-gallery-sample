/**
 * Copyright (c) 2020, 2022, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */

import {
  Component, OnInit, PLATFORM_ID, Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

const PAGE_PARAM_CATEGORY_NAME = 'categoryName';
const PAGE_PARAM_CATEGORY_ID = 'categoryId';

/**
 * This component displays the items belonging to a category in a grid view.
 * Upon clicking an image, it allows display of the images in a slideshow.
 *
 * The ImageGriodDataResolver gets all the data before this component is created.
 */
@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid-component.html',
})
export class ImageGridComponent implements OnInit {
  isServerRendering = true;

  // variables obtained from the routed URL
  categoryId: string;

  categoryName: string;

  items = [];

  totalResults = 0;

  currentImage = -1; // the index of the image currently being rendered

  hasImages = false;

  prevClassName = 'prev hidden';

  nextClassName = 'next';

  containerId = 0;

  /*
   * Set the title in the constructor.
   */
  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.titleService.setTitle(this.route.snapshot.queryParamMap.get(PAGE_PARAM_CATEGORY_NAME));
    this.isServerRendering = !isPlatformBrowser(this.platformId);
  }

  /*
   * Get the data from the route, the data was obtained
   * using a resolver before this component was created
   */
  ngOnInit() {
    // get the values from the routed URL
    this.categoryId = this.route.snapshot.paramMap.get(PAGE_PARAM_CATEGORY_ID);
    this.categoryName = this.route.snapshot.queryParamMap.get(PAGE_PARAM_CATEGORY_NAME);

    const data = this.route.snapshot.data.routeData;
    this.items = data.items;
    this.totalResults = data.totalResults;
  }

  /*
   * Handle click on the grid item. Sets the current image on the state.
   */
  handleClick(index: number) {
    this.currentImage = index;
    this.updateNextPrevButtonVisibility();
  }

  /*
   * Handle Keypress events. If the left arrow or right arrow key is pressed,
   * adjust the slideshow accordingly. If esc is pressed, exit slideshow mode.
   */
  handleKeypressFunction(e) {
    if (this.currentImage === -1) {
      return;
    }
    if (e.keyCode === 37) { // left arrow
      this.handlePrevNextClick(false);
    } else if (e.keyCode === 39) { // right arrow
      this.handlePrevNextClick(true);
    } else if (e.keyCode === 27) { // esc key
      this.handleCloseClick();
    }
  }

  /*
   * Handle clicks on the prev/next buttons. If its on the first item
   * or last item, don't do anything on the prev or next respectively
   */
  handlePrevNextClick(increment: boolean) {
    if ((this.currentImage === 0 && !increment)
         || (this.currentImage === this.totalResults - 1 && increment)) {
      // if we are on the first going to previous, or last going to next
      // then do not do anything
      return;
    }
    this.currentImage = increment ? this.currentImage + 1 : this.currentImage - 1;
    this.updateNextPrevButtonVisibility();
  }

  /*
   * Updates the visibility of the next and previous icons
   */
  updateNextPrevButtonVisibility() {
    const hidePrev = this.currentImage === 0;
    const hideNext = this.currentImage === this.totalResults - 1;
    this.prevClassName = `prev${hidePrev ? ' hidden' : ''}`;
    this.nextClassName = `next${hideNext ? ' hidden' : ''}`;
  }

  /*
   * Handle click on the close button of the slideshow.
   * Remove the modal-open class from the body so that scrollbars can
   * work again.
   */
  handleCloseClick() {
    this.currentImage = -1;
  }

  /*
   * Handle back button click to the main page
   */
  handleBack() {
    window.history.back();
  }
}
