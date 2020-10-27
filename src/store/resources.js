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
            resources.list = constructResources(action.payload);
            resources.loading = false;
            resources.lastFetch = Date.now();
        },
    }
});

const constructResources = (payload) => {
    const peerConnectedEvsesList = payload.data.evses_log.filter(evse => evse.peer_connected === "true" && evse.vin !== "");

    const resourceList = peerConnectedEvsesList.map(evse => {
        const ev = payload.data.cars_log.find(car => car.car_name === evse.car_name);
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
        
        let powerFlowPercent = 0;
        if (evse.power_flow_real_kw === '' || ev.power_capacity_up === '' || ev.power_capacity_up === 0)
        {
            powerFlowPercent = 0;
        } else {
            powerFlowPercent = Math.round(Math.abs(evse.power_flow_real_kw / ev.power_capacity_up) * 100);
            if(powerFlowPercent > 100) powerFlowPercent = 100;
            if(powerFlowPercent < 0) powerFlowPercent = 0;
        }

        return {
            evseId: evse.evse_id,
            vin: ev.vin,
            evseName: evse.name,
            evName: ev.car_name,
            resourceStatus: ev.primary_status,
            soc: Math.round(ev.soc),
            realPower: evse.power_flow_real_kw,
            powerFlowPercent,
            tCellAvg: evData.t_cell_avg,
            tCellMax: evData.t_cell_max,
            tCellMin: evData.t_cell_min
        }
    });

    return resourceList;
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