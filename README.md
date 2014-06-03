HTML5/Canvas Font Rendering Test
================================

Research on performance and aesthetics of various font rendering methods within HTML5.

ideas:
    Canvas
    WebGL
    SVG
    Server Images
    scaling
    css transformations
    etc.


Remarks:

- chrome, terrible font rendering without shadow
- shadow very slow in IE and firefox (fast in chrome and opera only)
- WebGL best-looking but slow (unfeasible for 5k+ letters)
- SVG very slow even on Chrome (stopping there)


Conclusion:


Browsers:
- IE 11.0.9600
- Firefox 29.0.1
- Canary Chrome 37.0.2015.0
- Opera 21.0