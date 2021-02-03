// Slice of the store
import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './middleware/networkCallActions';
import { statusUrl, dataUrl } from '../constants/urls';

////////////////////////////////////////////////////////////////////////////////
// Reducer (creates an action also)
////////////////////////////////////////////////////////////////////////////////

const slice = createSlice({
  name: 'resources',
  initialState: {
    evDataList: [],
    list: [],
    EVNClist: [],
    showEVNC: false,
    maxPower: 25,
    GICount: 0,
    NonGICount: 0,
    totalPowerFlow: 0,
    loading: false,
    lastFetch: null,
  },
  reducers: {
    resourcesRequestFailed: (resources, action) => {
      resources.loading = false;
    },
    resourcesRequested: (resources, action) => {
      resources.loading = true;
    },
    evDataReceived: (resources, action) => {
      resources.evDataList = action.payload.data;
    },
    resourcesReceived: (resources, action) => {
      let result = constructResources(action.payload);
      resources.list = result.resourceList.filter((resource) => resource.resourceStatus !== 'EV NC');
      resources.EVNClist = result.resourceList;
      resources.maxPower = result.maxPowerCap;
      resources.GICount = result.GICount;
      resources.NonGICount = result.resourceList.length - result.GICount;
      resources.totalPowerFlow = result.totalPowerFlow.toFixed(2);
      resources.loading = false;
      resources.lastFetch = Date.now();
    },
    resourceToggledEVNC: (resources, action) => {
      resources.showEVNC = !resources.showEVNC;
    }
  },
});

const notReportingEVData = {
  t_cell_avg: 'Not Known',
  t_cell_max: 'Not Known',
  t_cell_min: 'Not Known',
};

const noConnectedEV = {
  vin: 'No EV Connected',
  car_name: 'No EV Connected',
  primary_status: 'EV NC',
  soc: 'No EV Connected',
  power_capacity_up: 'No EV Connected'
}

const calculatePercentPower = (ev, evse) => {
  let powerFlowPercent = 0;

  if (ev) {
    if (evse.power_flow_real_kw === '' || ev.power_capacity_up === '') {
      powerFlowPercent = 0;
      ev.power_capacity_up = 0;
    } else {
      powerFlowPercent = Math.round(
        Math.abs(evse.power_flow_real_kw / ev.power_capacity_up) * 100
      );
      if (isNaN(powerFlowPercent)) {
        powerFlowPercent = 0;
        ev.power_capacity_up = 0;
      }
      if (powerFlowPercent > 100) powerFlowPercent = 100;
      if (powerFlowPercent < 0) powerFlowPercent = 0;
    }

    return powerFlowPercent;
  } else {
    return 'No EV Connected'
  }

};

const findEVData = (payload, evse) => {

  let evData = payload.stateData.find((data) => data.name === evse.car_name);

  if (!evData) return notReportingEVData;

  if (evData.t_cell_avg === '') {
    return notReportingEVData;
  } else {
    return evData;
  }
};

const constructResources = (payload) => {
  let maxPowerCap = -1;
  let GICount = 0;
  let totalPowerFlow = 0.00;
  let pf = 0.0;
  let evData;
  let ev;

  // For each evse, find the connected car
  const resourceList = payload.data.evses_log.map((evse) => {
    if (evse.vin === '') {
      ev = noConnectedEV;
      evData = notReportingEVData;
    }
    else {
      ev = payload.data.cars_log.find(
        (car) => car.car_name === evse.car_name
      );

      // Find the car data, if it exists
      evData = findEVData(payload, evse);

      // Calculate new maxPowerCap
      if (parseFloat(maxPowerCap) < parseFloat(ev.power_capacity_up)) {
        maxPowerCap = ev.power_capacity_up;
      }

      // Keep track of how many GI resources there are
      if (ev.primary_status === 'GI') GICount++;

      // Some evs (lion hq buses) were reporting a soc > 100
      if (ev.soc > 100) ev.soc = 100;
      ev.soc = Math.round(ev.soc)

      // Keep track of total power flow
      if (evse.power_flow_real_kw !== '') pf = parseFloat(evse.power_flow_real_kw)
      if ((ev.primary_status === 'GI' || ev.primary_status === 'SLP') && evse.power_flow_real_kw !== '') totalPowerFlow = totalPowerFlow + pf;
    }

    return {
      evseId: evse.evse_id,
      vin: ev.vin,
      evseName: evse.name,
      evName: ev.car_name,
      resourceStatus: ev.primary_status,
      soc: ev.soc,
      realPower: evse.power_flow_real_kw,
      powerFlowPercent: calculatePercentPower(ev, evse),
      maxPowerCapacity: ev.power_capacity_up,
      tCellAvg: evData.t_cell_avg,
      tCellMax: evData.t_cell_max,
      tCellMin: evData.t_cell_min,
    };
  });

  return { resourceList, maxPowerCap: Math.ceil(maxPowerCap), GICount, totalPowerFlow };
};

const {
  resourcesRequestFailed,
  resourcesRequested,
  resourcesReceived,
  evDataReceived,
  resourceToggledEVNC
} = slice.actions;

export default slice.reducer;

////////////////////////////////////////////////////////////////////////////////
// Action Creators
////////////////////////////////////////////////////////////////////////////////

export const loadResources = () => async (dispatch, getState) => {
  const { user, name, token, rto } = getState().entities.user;

  await dispatch(
    apiCallBegan({
      rto,
      url: dataUrl + `?user=${user}&name=${name}&token=${token}`,
      onStart: resourcesRequested.type,
      onSuccess: evDataReceived.type,
      onError: resourcesRequestFailed.type,
    })
  );

  return dispatch(
    apiCallBegan({
      rto,
      url: statusUrl + `?user=${user}&name=${name}&token=${token}`,
      onStart: resourcesRequested.type,
      onSuccess: resourcesReceived.type,
      onError: resourcesRequestFailed.type,
      stateData: getState().entities.resources.evDataList,
    })
  );
};

export const togleShowEVNC = () => (dispatch) => {
  return dispatch(resourceToggledEVNC());
};
