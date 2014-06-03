// Global variables
canvas = undefined;
context = undefined;
canvasWebGl = undefined;
contextWebGl = undefined;
rendererWebGl = undefined;

settings = {

    width: window.innerWidth,
    height: window.innerHeight,


    text: {
        font: 'arial',
        style: 'normal',
        size: 9,
        padding: 4,
        value: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', // 62 letters
        rotations: 20,

        color: {
            r: 0.0,
            g: 0.0,
            b: 0.0,
            a: 1.0
        },

        shadow: {
            blur: 0, // Blurring effect to the shadow, the larger the value, the greater the blur. Zero means disabled
            offsetX: 0, // Horizontal distance of the shadow, in relation to the text.
            offsetY: 0, // Vertical distance of the shadow, in relation to the text.
            color: {
                r: 0.0,
                g: 0.0,
                b: 0.0,
                a: 0.5
            }
        },

        backgroundColor: {
            r: 1.0,
            g: 1.0,
            b: 1.0,
            a: 1.0
        }
    }
};

function init() {

    function initCanvas() {
        canvas = document.getElementById("canvas");
        canvas.width = settings.width; //document.width is obsolete
        canvas.height = settings.height;
    }

    function initContext() {
        context = canvas.getContext("2d");
        context.canvas.width = settings.width;
        context.canvas.height = settings.height;
    }

    function initWebGl() {
        try {
            canvasWebGl = document.getElementById("canvasWebGl");
            contextWebGl = canvasWebGl.getContext("experimental-webgl") || canvasWebGl.getContext("webgl");
            if (!contextWebGl) throw "contextWebGl not initialized";

            rendererWebGl = PIXI.autoDetectRenderer(settings.width, settings.height, canvasWebGl, true, true);
            document.body.appendChild(rendererWebGl.view);

        } catch (err) {
            throw "Your web browser does not support WebGL!";
        }

    }

    initCanvas();
    initContext();
    initWebGl();
}

function colorToRgba(color) {
    return 'rgba(' + Math.floor(255 * color.r) + ',' + Math.floor(255 * color.g) + ',' + Math.floor(255 * color.b) + ',' + (color.a != undefined ? color.a : 1.0) + ')';
}

function colorToHex(color) {
    hexColor = '#';

    var rHex = (color.r * 255).toString(16);
    if (rHex.length == 1) rHex = '0' + rHex;

    var gHex = (color.g * 255).toString(16);
    if (gHex.length == 1) gHex = '0' + gHex;

    var bHex = (color.b * 255).toString(16);
    if (bHex.length == 1) bHex = '0' + bHex;

    return '#' + rHex + gHex + bHex;
};

function clearCanvas() {
    context.fillStyle = colorToRgba(settings.text.backgroundColor);
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function clearWebGl() {

    contextWebGl.clearColor(
        settings.text.backgroundColor.r,
        settings.text.backgroundColor.g,
        settings.text.backgroundColor.b,
        settings.text.backgroundColor.a
    );
    contextWebGl.clear(contextWebGl.COLOR_BUFFER_BIT);
}

function benchmark(func) {
    var start = +new Date();  // log start timestamp

    func();

    var end = +new Date();  // log end timestamp
    console.log(arguments[0].name + ": " + (end - start) + "ms");

    document.getElementById("time").innerHTML = (end - start) + "ms";
}

function drawLetterOnCanvas(context, letter, x, y, degrees) {

    if (degrees == 0) {
        context.fillText(letter, x, y);
    } else {
        var radians = degrees * Math.PI / 180;
        context.translate(x, y);
        context.rotate(radians);
        context.fillText(letter, 0, 0);
        context.rotate(-1 * radians);
        context.translate(-1 * x, -1 * y);
    }
}


var drawLettersOnCanvas = function drawFontsOnCanvas() {

    context.save();

    if (settings.text.shadow.blur) {
        context.shadowColor = colorToRgba(settings.text.shadow.color);
        context.shadowOffsetX = settings.text.shadow.offsetX;
        context.shadowOffsetY = settings.text.shadow.offsetY;
        context.shadowBlur = settings.text.shadow.blur;
    }

    context.font = settings.text.style + ' ' + settings.text.size + 'px ' + settings.text.font;
    context.fillStyle = colorToRgba(settings.text.color);

    for (var r = 0; r < settings.text.rotations; r++) {
        var x = settings.text.size + settings.text.padding;
        for (var c = 0; c < settings.text.value.length; c++) {
            var letter = settings.text.value.charAt(c);

            var y = (r + 1) * (settings.text.size + settings.text.padding);
            var x = (c + 1) * (settings.text.size + settings.text.padding);

            drawLetterOnCanvas(context, letter, x, y, r * 360.0 / settings.text.rotations);
        }
    }

    context.restore();

};

function drawLetterOnWebGl(stage, letter, x, y, degrees) {

    var text = new PIXI.Text(letter, {
        font: settings.text.size + "px " + settings.text.font,
        fill: colorToHex(settings.text.color)
    });

    text.position.x = x;
    text.position.y = y;
    text.rotation = degrees * Math.PI / 180

    stage.addChild(text);
}

var drawLettersOnWebGl = function drawLettersOnWebGl() {
    // create an new instance of a pixi stage
    var stage = new PIXI.Stage(0X000000, true);
    stage.interactive = false;

    for (var r = 0; r < settings.text.rotations; r++) {
        var x = settings.text.size + settings.text.padding;
        for (var c = 0; c < settings.text.value.length; c++) {
            var letter = settings.text.value.charAt(c);

            var y = (r + 1) * (settings.text.size + settings.text.padding);
            var x = (c + 1) * (settings.text.size + settings.text.padding);

            drawLetterOnWebGl(stage, letter, x, y, r * 360.0 / settings.text.rotations);
        }
    }

    rendererWebGl.render(stage);
};

function run() {
    //clearCanvas();
    //benchmark(drawLettersOnCanvas);

    //clearCanvas();
    clearWebGl();
    benchmark(drawLettersOnWebGl);
}





