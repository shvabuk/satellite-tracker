/*!
  * A library that shows the location of the ISS relative to the Earth. v1.0.2 (https://github.com/shvabuk/satellite-tracker)
  * Copyright 2024-2024 Ostap Shvab
  * Licensed under MIT (https://github.com/shvabuk/satellite-tracker/blob/master/LICENSE)
  * 
  */
'use strict';

const satelliteTracker = require('./satellite-tracker.cjs');
require('./helper.cjs');
require('./dom-handler.cjs');
require('./satellite.cjs');

class ISSTracker extends satelliteTracker {
    constructor(settings = {
        containerSelector: 'iss-tracker',
        map: {
            parts: {
                marker: {
                    title: 'ISS',
                },
            }
        }
    }) {
        super('25544', settings);
    }
}

module.exports = ISSTracker;
