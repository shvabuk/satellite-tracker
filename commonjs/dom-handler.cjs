/*!
  * A library that shows the location of the ISS relative to the Earth. v1.0.2 (https://github.com/shvabuk/satellite-tracker)
  * Copyright 2024-2024 Ostap Shvab
  * Licensed under MIT (https://github.com/shvabuk/satellite-tracker/blob/master/LICENSE)
  * 
  */
'use strict';

class DOMHandler {

    #settings = {};
    #containerElement;
    #markerElement;
    #valuesElements = {};

    constructor(settings) {
        this.#settings = settings;
        this.#containerElement = document.querySelector(`.${this.#settings.containerSelector}`);

        this.#initMapAndMarker();
        this.#initDetails();
    }

    setMarker(top, left) {
        this.#markerElement.style.top = top;
        this.#markerElement.style.left = left;
    }

    setDetails(details) {
        for (const name in details) {
            this.#setDetail(name, details[name]);
        }
    }

    #setDetail(name, value) {
        this.#valuesElements[name].innerText = value;
    }

    #initMapAndMarker() {
        if (this.#settings.map.generate) {
            const mapElement = this.#generateMapElement();
            this.#generateMarkerElement(mapElement);
        }

        this.#markerElement = this.#containerElement.querySelector(`.${this.#settings.map.parts.marker.selector}`);
    }

    #generateMapElement() {
        const mapElement = document.createElement("DIV");
        mapElement.classList.add(this.#settings.map.selector);
        mapElement.title = this.#settings.map.title;
        this.#containerElement.append(mapElement);

        return mapElement;
    }

    #generateMarkerElement(mapElement) {
        const marker = document.createElement("DIV");
        marker.classList.add(this.#settings.map.parts.marker.selector);
        marker.title = this.#settings.map.parts.marker.title;
        mapElement.append(marker);

        return marker;
    }

    #initDetails() {
        if (this.#settings.details.generate) {
            const detailsElement = this.#generateDetailsElement();
            this.#generateDetailsParts(detailsElement);
        }

        this.#valuesElements = this.#getValuesElements();
    }

    #generateDetailsElement() {
        const detailsElement = document.createElement("P");
        detailsElement.classList.add(this.#settings.details.selector);
        this.#containerElement.append(detailsElement);

        return detailsElement;
    }

    #generateDetailsParts(detailsElement) {
        this.#settings.details.parts;

        for (const name in this.#settings.details.parts) {
            this.#generateDetailsPart(detailsElement, this.#settings.details.parts[name]);
        }
    }

    #generateDetailsPart(detailsElement, part) {
        const rowElement = document.createElement("SPAN");
        rowElement.classList.add(this.#settings.details.partsSelector);
        rowElement.innerText = part.label;

        const valueElement = document.createElement("SPAN");
        valueElement.classList.add(part.valueSelector);
        rowElement.append(valueElement);

        detailsElement.append(rowElement);
    }

    #getValuesElements() {
        const result = {};

        for (const name in this.#settings.details.parts) {
            result[name] = this.#containerElement.querySelector(`.${this.#settings.details.parts[name].valueSelector}`);
        }

        return result;
    }
}

module.exports = DOMHandler;
