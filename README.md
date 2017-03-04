**Obsoloted by Valve's http://www.valvesoftware.com/publications/2007/SIGGRAPH2007_AlphaTestedMagnification.pdf and SDF fonts on WebGL.**

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

- Chrome: fast; quality good (not tested with shadows)
- IE: fast; quality good (not tested with shadows)
- Firefox: fast; quality good (not tested with shadows)


**Conclusion:**

With respect to the above results, we should stick with canvas font rendering initially.
This method is the fastest across all browsers.
The only problem persists in Chrome browsers where fonts are rendered pixelated.
Fortunately adding shadows in Chrome does not impact rendering speed, unlike in IE and Firefox where shadows make rendering too slow and should not be used.
Thus, we should active shadow blur for Chrome browsers only to smooth out pixelation and disable it for all other.

SVG font rendering is very slow even on Chrome, thus it was not even tested on other browsers.
However using this method allows us to use all the CSS techniques: shadows, glows, font decorations, etc. (see [examples](http://tutorials.jenkov.com/svg/text-element.html#styling-text)).
Perhaps for a few horizontal labels (e.g. cities, states, etc.) this could be used to add the glow/shadow effects.

WebGL font rendering produces the best quality, but is very slow and thus unfeasible. Additionally WebGL is not supported on some browsers.

Server side can produce the best quality font rendering depending on the server-side rendering engine.
Drawing images on canvas is as fast as standard fillText function.
Google Maps Lite uses this technique for horizontal labels to add shadow, glow and custom fonts.
Should canvas rendering be insufficient to produce high quality font rendering with all the effects (as we were used to in flash), we should at one stage switch to this technique.


**Browsers:**

- IE 11.0.9600
- Firefox 29.0.1
- Canary Chrome 37.0.2015.0
- Chrome 35.0.1916.114
- Opera 21.0

