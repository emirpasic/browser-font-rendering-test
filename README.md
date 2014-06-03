HTML5/Canvas Font Rendering Test
================================

Research on performance and aesthetics of various font rendering methods within HTML5.

**Rendering methods:**

- Canvas: directly drawing letters on canvas using *fillText* with and without shadows for smoothing
- WebGL: using [Pixi.js](http://www.pixijs.com/) to draw letters on WebGl context
- SVG: dynamically creating and drawing SVGs on canvas (more [info](https://developer.mozilla.org/en-US/docs/Web/HTML/Canvas/Drawing_DOM_objects_into_a_canvas))
- Server Images: creating images server-side and drawing them directly on the canvas using *drawImage*


**Results:**

All resulting images (with execution timings) can be found within the *`results`* folder.

Each test renders the alphabet (uppercase/lowercase) and digits (62 in total) in 20 different rotations (0, 18, 36, 54,... degrees). Thus, total number of letters is 1240.

By `slow` we mean font rendering that is unfeasible to be used on our maps with 5000 or more letters on a single viewport.

Quality has been subjectively categorized into `bad`, `good` and `excellent`. In terms of our maps, we can tolerate all except `bad`.

Canvas rendering:

- Chrome: fast with and without shadow; quality bad without shadow (pixelated) which can be avoided with shadows
- IE: fast without shadow, slow with shadow; quality good even without shadow
- Firefox: fast without shadow, slow with shadow; quality bad without shadow (pixelated) which can be avoided with shadows

WebGL rendering:

- Chrome: slow; quality excellent
- IE: slow; quality good (note: software rendering, since WebGL is disabled)
- Firefox: slow; quality excellent

SVG rendering:

- Chrome: slow; quality bad (not tested with shadows)
- IE: ignored for same reasons as Chrome
- Firefox: ignored for same reasons as Chrome

Server rendering:

Not tested, but assumed to produce the best quality font rendering. Mitigates the processing overhead on the client side in exchange for the network and server side overhead. Google Maps Lite uses this technique for horizontal labels to add shadow, glow and custom fonts.


**Remarks:**

TODO delete this section

- chrome, terrible font rendering without shadow
- shadow very slow in IE and firefox (fast in chrome and opera only)
- WebGL best-looking but slow (unfeasible for 5k+ letters)
- SVG very slow even on Chrome (stopping there)
- SVG potential to customize using CSS


**Conclusion:**

TODO

**Browsers:**

- IE 11.0.9600
- Firefox 29.0.1
- Canary Chrome 37.0.2015.0
- Chrome 35.0.1916.114
- Opera 21.0