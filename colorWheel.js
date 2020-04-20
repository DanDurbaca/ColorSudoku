"use strict;";

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
}

function describeTrapezoidalArc(x, y, radius, fraction, startAngle, endAngle) {
    var startBigArc = polarToCartesian(x, y, radius, endAngle);
    var endBigArc = polarToCartesian(x, y, radius, startAngle);
    var smallRadius = radius * fraction;
    var startSmallArc = polarToCartesian(x, y, smallRadius, endAngle);
    var endSmallArc = polarToCartesian(x, y, smallRadius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M",
        startBigArc.x,
        startBigArc.y,
        "A",
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        endBigArc.x,
        endBigArc.y,
        "L",
        endSmallArc.x,
        endSmallArc.y,
        "L",
        startSmallArc.x,
        startSmallArc.y,
        "z",
    ].join(" ");
    return d;
}

function addWheel(htmlElem, noOfColors = 10) {
    let _mouseDown = (event) => {
        let myWheel = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        myWheel.setAttribute("viewBox", "0 0 200 200");

        myWheel.style.zIndex = 100;
        myWheel.style.position = "relative";
        myWheel.style.left = "-50%";
        myWheel.style.top = "-50%";

        let degreesPerColor = 360 / noOfColors;

        for (let curColor = 0; curColor < noOfColors; curColor++) {
            let curElementColor = document.createElementNS("http://www.w3.org/2000/svg", "path");
            curElementColor.id = "color" + curColor;
            startAngle = (curColor * degreesPerColor + 360 - 18) % 360; // make this positive mod 360 !
            curElementColor.setAttribute("d", describeTrapezoidalArc(100, 100, 95, 0.3, startAngle, (curColor + 1) * degreesPerColor - 18));
            curElementColor.setAttribute("fill", colors[curColor]);
            curElementColor.setAttribute("stroke", "#446688");
            curElementColor.setAttribute("stroke-width", "1");

            myWheel.appendChild(curElementColor);
        }

        myWheel.setAttribute("width", "200%");
        myWheel.setAttribute("height", "200%");

        htmlElem.appendChild(myWheel);

        let _mouseUp = (event) => {
            if (event.target.id.substring(0, 5) == "color") {
                let boxId = parseInt(htmlElem.id.substring(3));
                let boxCol = boxId % 9;
                let boxRow = (boxId - boxCol) / 9;
                if (parseInt(event.target.id.substring(5)) - 1 === solution[boxRow][boxCol]) {
                    // success -> the right color was chosen !
                    htmlElem.style.backgroundColor = colors[solution[boxRow][boxCol] + 1];
                    htmlElem.removeEventListener("mousedown", _mouseDown, true);
                }
            }
            htmlElem.removeChild(myWheel);
            document.removeEventListener("mouseup", _mouseUp, true);
        };
        document.addEventListener("mouseup", _mouseUp, true);
    };
    htmlElem.addEventListener("mousedown", _mouseDown, true);
}
