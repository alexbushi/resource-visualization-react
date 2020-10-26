import * as viewTypes from '../viewTypes';
import {percentColorList, temperatureColorList} from '../constants';

const calculateColor = (resource, view) => {
    let redValue = 0;
    let greenValue = 0;
    let blueValue = 0;

    let {resourceStatus: status, temperature: temp} = resource;

    if(view === viewTypes.status) {
        if (status === 'GI') {
            redValue = 0
            greenValue = 128
            blueValue = 0
        }
        else if (status === 'CH') {
            redValue = 153
            greenValue = 102
            blueValue = 51
        }
        else if (status === 'NK') {
            redValue = greenValue = blueValue = 128;
        }
        else if (status === 'NC') {
            redValue = greenValue = blueValue = 128;
        }
        else if (status === 'SLP') {
            redValue = 179
            greenValue = 240
            blueValue = 255
        }
        else {
            redValue = 230
            greenValue = 0
            blueValue = 0
        }
    }
    else if (view === viewTypes.temperature) {
        if (temp <= 5) {
            redValue = temperatureColorList[0].red;
            greenValue = temperatureColorList[0].green;
            blueValue = temperatureColorList[0].blue;
        }
        else if (temp >= 5 && temp < 10) {
            redValue = temperatureColorList[1].red;
            greenValue = temperatureColorList[1].green;
            blueValue = temperatureColorList[1].blue;
        }
        else if (temp >= 10 && temp < 15) {
            redValue = temperatureColorList[2].red;
            greenValue = temperatureColorList[2].green;
            blueValue = temperatureColorList[2].blue;
        }
        else if (temp >= 15 && temp < 20) {
            redValue = temperatureColorList[3].red;
            greenValue = temperatureColorList[3].green;
            blueValue = temperatureColorList[3].blue;
        }
        else if (temp >= 20 && temp < 25) {
            redValue = temperatureColorList[4].red;
            greenValue = temperatureColorList[4].green;
            blueValue = temperatureColorList[4].blue;
        }
        else if (temp >= 25 && temp < 30) {
            redValue = temperatureColorList[5].red;
            greenValue = temperatureColorList[5].green;
            blueValue = temperatureColorList[5].blue;
        }
        else if (temp >= 30 && temp < 35) {
            redValue = temperatureColorList[6].red;
            greenValue = temperatureColorList[6].green;
            blueValue = temperatureColorList[6].blue;
        }
        else if (temp >= 35 && temp < 40) {
            redValue = temperatureColorList[7].red;
            greenValue = temperatureColorList[7].green;
            blueValue = temperatureColorList[7].blue;
        }
        else {
            redValue = temperatureColorList[8].red;
            greenValue = temperatureColorList[8].green;
            blueValue = temperatureColorList[8].blue;
        }
    }
    else {
        let {position, colorsList} = determineViewParameters(resource, view); 

        if (resource.resourceStatus === 'GI') {
            let positionInColorArray = (position / 100 * (colorsList.length - 1));
            let index = Math.trunc(positionInColorArray);
            let remainder = (positionInColorArray - index);

            if (remainder === 0.0) {
                redValue = colorsList[index].red;
                greenValue = colorsList[index].green;
                blueValue = colorsList[index].blue
            } else {
                redValue = colorsList[index].red === colorsList[index + 1].red ? colorsList[index].red : Math.round(colorsList[index].red + (colorsList[index + 1].red - colorsList[index].red) * remainder);
                greenValue = colorsList[index].green === colorsList[index + 1].green ? colorsList[index].green : Math.round(colorsList[index].green + (colorsList[index + 1].green - colorsList[index].green) * remainder);
                blueValue = colorsList[index].blue === colorsList[index + 1].blue ? colorsList[index].blue : Math.round(colorsList[index].blue + (colorsList[index + 1].blue - colorsList[index].blue) * remainder);
            }
        }
        else {
            redValue = greenValue = blueValue = 128;
        }
    }
    return ({redValue, greenValue, blueValue});
}

const determineViewParameters = (resource, view) => {
    let position = 0;
    let colorsList = [];

    const {realPower, powerFlowPercent, soc} = resource;

    if(view === viewTypes.powerFlowPercent) {
        position = powerFlowPercent;
        colorsList = percentColorList;
    } else if (view === viewTypes.powerFlowkW) {
        // Need to scale dynamically (currently -25 to 25 kW)
        position = (2 * realPower) + 50;
        colorsList = percentColorList;
    } else {
        position = soc;
        colorsList = percentColorList;
    }
    
    return ({position, colorsList});
};

export default calculateColor;