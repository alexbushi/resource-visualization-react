export const statusUrl = '/api/get_status';
export const dataUrl = '/api/ev/data/get'
export const loginUrl = '/api/auth'
export const logoutUrl = '/api/logout'
export const savedSettingsUrl = '/api/settings/get'
export const setSavedSettingsUrl = '/api/settings/set'
export const baseURL = 'http://localhost:8010/proxy';

export const rtoList = [
    { _id: 0, name: "PJM" },
    { _id: 1, name: "CAISO" },
    {_id: 2, name: "Denmark"},
    {_id: 3, name: "France"},
    {_id: 4, name: "United Kingdom"}
  ];

  export const determineBaseURL = (rto) => {
    let url = '';
    if (rto === rtoList[0].name) {
      url = 'pjm.nuvve.com';
    } else if (rto === rtoList[1].name) {
      url = 'caiso.nuvve.com';
    } else if (rto === rtoList[2].name) {
      url = 'aggregator.nuvve.dk';
    } else if (rto === rtoList[3].name) {
      url = 'aggregator.nuvve.fr';
    } else if (rto === rtoList[4].name) {
      url = 'aggregator.nuvve.co.uk';
    } else {
      url = 'pjm.nuvve.com';
    }
  return 'https://' + url;
  };

export const percentColorList = [
    { red: 84, green: 48, blue: 5},
    { red: 140, green: 81, blue: 10},
    { red: 191, green: 129, blue: 45},
    { red: 223, green: 194, blue: 125},
    { red: 246, green: 232, blue: 195},
    { red: 245, green: 245, blue: 245},
    { red: 199, green: 234, blue: 229},
    { red: 128, green: 205, blue: 193},
    { red: 53, green: 151, blue: 143},
    { red: 1, green: 102, blue: 94},
    { red: 0, green: 60, blue: 48},
  ];

  export const temperatureColorList = [
    { red: 41, green: 98, blue: 255},
    { red: 67, green: 147, blue: 195},
    { red: 146, green: 197, blue: 222},
    { red: 209, green: 229, blue: 240},
    { red: 247, green: 247, blue: 247},
    { red: 253, green: 219, blue: 199},
    { red: 244, green: 165, blue: 130},
    { red: 214, green: 96, blue: 77},
    { red: 178, green: 24, blue: 43},
  ];

  export const statusColorList = [
    { red: 230, green: 0, blue: 0},
    { red: 179, green: 240, blue: 255},
    { red: 128, green: 128, blue: 128},
    { red: 128, green: 128, blue: 128},
    { red: 153, green: 102, blue: 51},
    { red: 0, green: 128, blue: 0},
  ];