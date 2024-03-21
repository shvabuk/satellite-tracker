/*!
  * A library that shows the location of the ISS relative to the Earth. v1.0.2 (https://github.com/shvabuk/satellite-tracker)
  * Copyright 2024-2024 Ostap Shvab
  * Licensed under MIT (https://github.com/shvabuk/satellite-tracker/blob/master/LICENSE)
  * 
  */
'use strict';

class Satellite {
    #satelliteID;

    constructor(satelliteID) {
        this.#satelliteID = satelliteID;
    }

    async getStatus() {
        const response = await fetch(`https://api.wheretheiss.at/v1/satellites/${this.#satelliteID}`);
        
        if (!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();

        return this.#toSupplementValues(data);
    }

    #toSupplementValues(data) {
        const supplementedValues = {
            details: {
                latitude: data.latitude.toFixed(2),
                longitude: data.longitude.toFixed(2),
                velocity: `${data.velocity.toFixed(2)} km/hr`,
                altitude: `${data.altitude.toFixed(2)} km`,
                visibility: data.visibility,
            },
            marker: {
                top: this.#getMarkerEquirectangularTopPosition(data.latitude),
                left: this.#getMarkerEquirectangularLeftPosition(data.longitude),
            }
        };

        return supplementedValues;
    }

    #getMarkerEquirectangularTopPosition(latitude) {
        const top = 100 - (latitude + 90) * 100 / 180;
        return `${top}%`;
    }

    #getMarkerEquirectangularLeftPosition(longitude) {
        const left = (longitude + 180) * 100 / 360;
        return `${left}%`;
    }
}

module.exports = Satellite;
