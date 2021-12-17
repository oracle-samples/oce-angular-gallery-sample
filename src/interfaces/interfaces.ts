/**
 * Copyright (c) 2021, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */

/* eslint-disable @typescript-eslint/naming-convention */
// we are ignoring the camelCase warning for fields in RenditionURLs
// as the names are set in Content Server so we can not do anything about it

/**
 * This file contains the definitions of all the data used in this application
 */
export interface ImageRenditions {
  srcset: string;
  jpgSrcset: string;
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  native: string;
  width: string;
  height: string;
}

export interface Item {
  id: string;
  name: string;
  renditionUrls: ImageRenditions;
}

export interface Category {
  id: string;
  name: string;
  totalResults: number;
  items: Item[];
}

// -- PROXY SERVER --

// Note: the headers are optional in the HttpOptions
export interface HttpOptions {
  headers?: {} ;
}
