import SatelliteTracker from './satellite-tracker.js';

export default class ISSTracker extends SatelliteTracker {
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
