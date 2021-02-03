import * as viewTypes from '../constants/viewTypes';
import {
  percentColorList,
  temperatureColorList,
  statusColorList,
} from '../constants/colorLists';

const calculateColor = (resource, view, maxPower) => {
  let redValue = 0;
  let greenValue = 0;
  let blueValue = 0;

  let { resourceStatus: status, tCellAvg: temp } = resource;

  if (view.name === viewTypes.status.name) {
    if (status === 'GI') {
      redValue = statusColorList[6].red;
      greenValue = statusColorList[6].green;
      blueValue = statusColorList[6].blue;
    } else if (status === 'CH') {
      redValue = statusColorList[5].red;
      greenValue = statusColorList[5].green;
      blueValue = statusColorList[5].blue;
    } else if (status === 'NK') {
      redValue = greenValue = blueValue = statusColorList[4].red;
    } else if (status === 'NC') {
      redValue = greenValue = blueValue = statusColorList[3].red;
    } else if (status === 'SLP') {
      redValue = statusColorList[2].red;
      greenValue = statusColorList[2].green;
      blueValue = statusColorList[2].blue;
    } else if (status === 'EV NC') {
      redValue = statusColorList[1].red;
      greenValue = statusColorList[1].green;
      blueValue = statusColorList[1].blue;
    } else {
      redValue = statusColorList[0].red;
      greenValue = statusColorList[0].green;
      blueValue = statusColorList[0].blue;
    }
  } else if (view.name === viewTypes.temperature.name) {
    if (status === 'EV NC') {
      redValue = statusColorList[1].red;
      greenValue = statusColorList[1].green;
      blueValue = statusColorList[1].blue;
    }
    else {
      if (temp <= 5 && temp >= 0) {
        redValue = temperatureColorList[0].red;
        greenValue = temperatureColorList[0].green;
        blueValue = temperatureColorList[0].blue;
      } else if (temp >= 5 && temp < 10) {
        redValue = temperatureColorList[1].red;
        greenValue = temperatureColorList[1].green;
        blueValue = temperatureColorList[1].blue;
      } else if (temp >= 10 && temp < 15) {
        redValue = temperatureColorList[2].red;
        greenValue = temperatureColorList[2].green;
        blueValue = temperatureColorList[2].blue;
      } else if (temp >= 15 && temp < 20) {
        redValue = temperatureColorList[3].red;
        greenValue = temperatureColorList[3].green;
        blueValue = temperatureColorList[3].blue;
      } else if (temp >= 20 && temp < 25) {
        redValue = temperatureColorList[4].red;
        greenValue = temperatureColorList[4].green;
        blueValue = temperatureColorList[4].blue;
      } else if (temp >= 25 && temp < 30) {
        redValue = temperatureColorList[5].red;
        greenValue = temperatureColorList[5].green;
        blueValue = temperatureColorList[5].blue;
      } else if (temp >= 30 && temp < 35) {
        redValue = temperatureColorList[6].red;
        greenValue = temperatureColorList[6].green;
        blueValue = temperatureColorList[6].blue;
      } else if (temp >= 35 && temp < 40) {
        redValue = temperatureColorList[7].red;
        greenValue = temperatureColorList[7].green;
        blueValue = temperatureColorList[7].blue;
      } else if (temp >= 40) {
        redValue = temperatureColorList[8].red;
        greenValue = temperatureColorList[8].green;
        blueValue = temperatureColorList[8].blue;
      } else {
        // Not reporting a temperature
        redValue = greenValue = blueValue = 128;
      }
    }
  } else {
    let { position, colorsList } = determineDynamicViewParameters(
      resource,
      view,
      maxPower
    );

    if (status === 'GI' || status === 'CH') {
      let positionInColorArray = (position / 100) * (colorsList.length - 1);
      let index = Math.trunc(positionInColorArray);
      let remainder = positionInColorArray - index;

      if (remainder === 0.0) {
        redValue = colorsList[index].red;
        greenValue = colorsList[index].green;
        blueValue = colorsList[index].blue;
      } else {
        redValue =
          colorsList[index].red === colorsList[index + 1].red
            ? colorsList[index].red
            : Math.round(
              colorsList[index].red +
              (colorsList[index + 1].red - colorsList[index].red) *
              remainder
            );
        greenValue =
          colorsList[index].green === colorsList[index + 1].green
            ? colorsList[index].green
            : Math.round(
              colorsList[index].green +
              (colorsList[index + 1].green - colorsList[index].green) *
              remainder
            );
        blueValue =
          colorsList[index].blue === colorsList[index + 1].blue
            ? colorsList[index].blue
            : Math.round(
              colorsList[index].blue +
              (colorsList[index + 1].blue - colorsList[index].blue) *
              remainder
            );
      }
    }
    else if (status === 'EV NC') {
      redValue = statusColorList[1].red;
      greenValue = statusColorList[1].green;
      blueValue = statusColorList[1].blue;
    }
    else {
      // Status not GI or CH or EV NC return grey
      redValue = greenValue = blueValue = 128;
    }
  }
  return { redValue, greenValue, blueValue };
};

const determineDynamicViewParameters = (resource, view, maxPower) => {
  let position = 0;
  let colorsList = [];

  // Issue here when there are blank values for soc or realPower, percent should be taken care of
  const { realPower, powerFlowPercent, soc } = resource;

  if (view.name === viewTypes.powerFlowPercent.name) {
    position = powerFlowPercent;
    colorsList = percentColorList;
  } else if (view.name === viewTypes.powerFlowkW.name) {
    // Scale to 0 to 100
    let minPower = maxPower * -1;
    position = (100 * (realPower - minPower)) / (maxPower - minPower);
    colorsList = percentColorList;
  } else {
    position = soc;
    colorsList = percentColorList;
  }
  return { position, colorsList };
};

export default calculateColor;
