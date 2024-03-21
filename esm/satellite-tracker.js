import { deepMerge } from './helper.js';
import DOMHandler from './dom-handler.js';
import Satellite from './satellite.js';

export default class SatelliteTracker {
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
        this.#satellite = new Satellite(satelliteID);

        const mergedSettings = deepMerge(deepMerge({}, this.#defaultSettings), settings);
        this.#domHandler = new DOMHandler(mergedSettings);
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
