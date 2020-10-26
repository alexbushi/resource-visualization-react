import * as viewTypes from '../viewTypes';
import {percentColorList, temperatureColorList} from '../constants';

const calculateColor = (resource, view) => {
    let redValue = 0;
    let greenValue = 0;
    let blueValue = 0;

    let {resourceStatus: status} = resource;

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
    else {
        let {position, colorsList} = determineViewParameters(resource, view); 

        // TODO: if CH then show lightning bolt symbol for both power flow views
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

    const {realPower, powerFlowPercent, soc, temperature} = resource;

    if(view === viewTypes.powerFlowPercent) {
        position = powerFlowPercent;
        colorsList = percentColorList;
    } else if (view === viewTypes.powerFlowkW) {
        // Need to scale dynamically (currently -25 to 25 kW)
        position = (2 * realPower) + 50;
        colorsList = percentColorList;
    } else if (view === viewTypes.soc) {
        position = soc;
        colorsList = percentColorList;
    } else { // Implement static Temperature if/else
        position = temperature;
        colorsList = temperatureColorList;
    }
    
    return ({position, colorsList});
};

export default calculateColor;