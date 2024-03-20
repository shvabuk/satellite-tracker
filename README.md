# Satellite tracker

A library that shows the location of the ISS relative to the Earth.

## Main file

src/satellite-tracker.js

## Integration example

### HTML
```html
<div class="iss-tracker"></div>
```

### CSS
```css
.satellite-world-map {
    position: relative;
    margin: 0 auto;
    background-image: url("../images/world-map.png");
    background-size: cover;
    max-width: 512px;
}

.satellite-world-map:before {
    content: "";
    display: block;
    width: 100%;
    padding-top: 50%;
}

.satellite-marker {
    box-sizing: border-box;
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: white;
    border: 2px solid black;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: blink 1s linear infinite;
}
```

### JavaScript
```js
import { ISSTracker } from 'path_to_file/satellite-tracker.js';

const ISS = new ISSTracker();
const updateInterval = 60000; // milliseconds
ISS.runAutoupdate(updateInterval);
```
