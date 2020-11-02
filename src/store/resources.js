// Slice of our store
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from './middleware/networkCallActions';
import { statusUrl, dataUrl } from '../constants';

////////////////////////////////////////////////////////////////////////////////
// Reducer (creates an action also)
////////////////////////////////////////////////////////////////////////////////

const slice = createSlice({
    name: "resources",
    initialState: {
        evDataList: [],
        list: [],
        maxPower: 25,
        loading: false,
        lastFetch: null
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
            resources.list = result.resourceList;
            resources.maxPower = result.maxPowerCap;
            resources.loading = false;
            resources.lastFetch = Date.now();
        },
    }
});

const constructResources = (payload) => {
    let maxPowerCap = -1;

    // 1) Find evses that are peer connected AND vin connected is not null
    const peerConnectedEvsesList = payload.data.evses_log.filter(evse => evse.peer_connected === "true" && evse.vin !== "");

    // 2) For each evse found above, find the connected car
    const resourceList = peerConnectedEvsesList.map(evse => {
        const ev = payload.data.cars_log.find(car => car.car_name === evse.car_name);

        // 3) For every connected car find the data from it
        let evData = {};
        try {
            evData = payload.stateData.find(data => data.name === evse.car_name);
            if (evData.t_cell_avg === '') {
                evData = {
                    t_cell_avg: 'Not Reporting',
                    t_cell_max: 'Not Reporting',
                    t_cell_min: 'Not Reporting'
                }
            }
        } catch (error) {
            evData = {
                t_cell_avg: 'Not Reporting',
                t_cell_max: 'Not Reporting',
                t_cell_min: 'Not Reporting'
            }
        }
        
        // 4) For each resource, calculate percent power
        let powerFlowPercent = 0;
        if (evse.power_flow_real_kw === '' || ev.power_capacity_up === '') {
            powerFlowPercent = 0;
            ev.power_capacity_up = 0;
        } else {
            powerFlowPercent = Math.round(Math.abs(evse.power_flow_real_kw / ev.power_capacity_up) * 100);
            if (isNaN(powerFlowPercent)) {
                powerFlowPercent = 0;
                ev.power_capacity_up = 0;
            }
            if(powerFlowPercent > 100) powerFlowPercent = 100;
            if(powerFlowPercent < 0) powerFlowPercent = 0;
        }

        // Calculate new maxPowerCap
        if (ev.power_capacity_up > maxPowerCap) maxPowerCap = ev.power_capacity_up;

        return {
            evseId: evse.evse_id,
            vin: ev.vin,
            evseName: evse.name,
            evName: ev.car_name,
            resourceStatus: ev.primary_status,
            soc: Math.round(ev.soc),
            realPower: evse.power_flow_real_kw,
            powerFlowPercent,
            maxPowerCapacity: ev.power_capacity_up,
            tCellAvg: evData.t_cell_avg,
            tCellMax: evData.t_cell_max,
            tCellMin: evData.t_cell_min
        }
    });

    return {resourceList, maxPowerCap: Math.ceil(maxPowerCap)};
}

const {
    resourcesRequestFailed, 
    resourcesRequested, 
    resourcesReceived, 
    evDataReceived,
} = slice.actions;

export default slice.reducer;

////////////////////////////////////////////////////////////////////////////////
// Action Creators
////////////////////////////////////////////////////////////////////////////////

export const loadResources = () => async (dispatch, getState) => {
    const {user, name, token} = getState().entities.user;

    await dispatch(apiCallBegan({
        url: dataUrl + `?user=${user}&name=${name}&token=${token}`,
        onStart: resourcesRequested.type,
        onSuccess: evDataReceived.type,
        onError: resourcesRequestFailed.type,
    }));

    return dispatch(
        apiCallBegan({
            url: statusUrl + `?user=${user}&name=${name}&token=${token}`,
            onStart: resourcesRequested.type,
            onSuccess: resourcesReceived.type,
            onError: resourcesRequestFailed.type,
            stateData: getState().entities.resources.evDataList,
        })
    );
};