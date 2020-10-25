const calculateColor = (position, colorsList) => {
    let positionInColorArray = (position / 100 * (colorsList.length - 1));
    let index = Math.trunc(positionInColorArray);
    let remainder = (positionInColorArray - index);

    let redValue = 0;
    let greenValue = 0;
    let blueValue = 0;

    if (remainder === 0.0) {
        redValue = colorsList[index].red;
        greenValue = colorsList[index].green;
        blueValue = colorsList[index].blue
    } else {
        //calculate new color
        redValue = colorsList[index].red === colorsList[index + 1].red ? colorsList[index].red : Math.round(colorsList[index].red + (colorsList[index + 1].red - colorsList[index].red) * remainder);
        greenValue = colorsList[index].green === colorsList[index + 1].green ? colorsList[index].green : Math.round(colorsList[index].green + (colorsList[index + 1].green - colorsList[index].green) * remainder);
        blueValue = colorsList[index].blue === colorsList[index + 1].blue ? colorsList[index].blue : Math.round(colorsList[index].blue + (colorsList[index + 1].blue - colorsList[index].blue) * remainder);
    }
    return ({redValue, greenValue, blueValue});
}

export default calculateColor;