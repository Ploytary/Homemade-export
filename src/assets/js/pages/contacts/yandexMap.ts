import { findHtmlElement } from '../../helpers/dom';
import type { LngLat, YMapLocationRequest } from '@yandex/ymaps3-types';
import { YMap, YMapDefaultFeaturesLayer, YMapDefaultSchemeLayer } from '@yandex/ymaps3-types';

const MAP_CONTAINER_NAME = '.contacts-section__map';
const MAP_CENTER: LngLat = [37.623082, 55.75254];

const LOCATION: YMapLocationRequest = {
  center: MAP_CENTER,
  zoom: 15,
};

export function initMap() {
  try {
    new YMap(findHtmlElement(MAP_CONTAINER_NAME), { location: LOCATION }, [
      new YMapDefaultSchemeLayer({}),
      new YMapDefaultFeaturesLayer({}),
    ]);
  } catch (error) {
    console.error(error);
  }
}
