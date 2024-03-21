/*!
  * A library that shows the location of the ISS relative to the Earth. v1.0.2 (https://github.com/shvabuk/satellite-tracker)
  * Copyright 2024-2024 Ostap Shvab
  * Licensed under MIT (https://github.com/shvabuk/satellite-tracker/blob/master/LICENSE)
  * 
  */
'use strict';

const helper = require('./helper.cjs');
const domHandler = require('./dom-handler.cjs');
const satellite = require('./satellite.cjs');

class SatelliteTracker {
    #defaultSettings = {
        containerSelector: 'satellite-tracker',
        details: {
            generate: true,
            selector: 'satellite-details',
            partsSelector: 'satellite-details-part',
            parts : {
                latitude: {
                    valueSelector: 'satellite-latitude',
                    label: 'Latitude: ',
                },
                longitude: {
                    valueSelector: 'satellite-longitude',
                    label: 'Longitude: ',
                },
                velocity: {
                    valueSelector: 'satellite-velocity',
                    label: 'Speed: ',
                },
                altitude: {
                    valueSelector: 'satellite-altitude',
                    label: 'Altitude: ',
                },
                visibility: {
                    valueSelector: 'satellite-visibility',
                    label: 'Visibility: ',
                },
            },
        },
        map: {
            generate: true,
            selector: 'satellite-world-map',
            title: 'World map',
            parts: {
                marker: {
                    selector: 'satellite-marker',
                    title: 'Satellite',
                }
            }
        }
    };
    #satellite;
    #domHandler;
    #intervalID;

    constructor(satelliteID, settings = {}) {
        this.#satellite = new satellite(satelliteID);

        const mergedSettings = helper.deepMerge(helper.deepMerge({}, this.#defaultSettings), settings);
        this.#domHandler = new domHandler(mergedSettings);
    }

    runAutoupdate(delay) {
        this.updateValues();
        this.#intervalID = setInterval(()=>this.updateValues(), delay);
    }

    stopAutoupdate() {
        clearInterval(this.#intervalID);
    }

    updateValues() {
        this.#satellite.getStatus().then(data => {
            this.#domHandler.setDetails(data.details);

            this.#domHandler.setMarker(data.marker.top, data.marker.left);
            
        }).catch(error => {
            console.error(error.message);
        });
    }
}

module.exports = SatelliteTracker;
