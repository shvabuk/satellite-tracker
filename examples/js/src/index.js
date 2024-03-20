import ISSTracker from '../../../src/iss-tracker.js';

document.addEventListener('DOMContentLoaded', function () {
  // ISS Tracker start
  const ISS = new ISSTracker();
  const updateInterval = 60000; // milliseconds
  ISS.runAutoupdate(updateInterval);
});
