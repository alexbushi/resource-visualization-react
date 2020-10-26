// Slice of our store
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from './middleware/networkCallActions';
import { statusUrl } from '../constants';

////////////////////////////////////////////////////////////////////////////////
// Reducer (creates an action also)
////////////////////////////////////////////////////////////////////////////////

const slice = createSlice({
    name: "resources",
    initialState: {
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
        resourcesReceived: (resources, action) => {
            resources.list = constructResources(action.payload);
            resources.loading = false;
            resources.lastFetch = Date.now();
        },
    }
});

const constructResources = payload => {

    const peerConnectedEvsesList = payload.evses_log.filter(evse => evse.peer_connected === "true" && evse.vin !== "");

    const resourceList = peerConnectedEvsesList.map(evse => {
        const ev = payload.cars_log.find(car => car.car_name === evse.car_name);
        
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
            powerFlowPercent
        }
    });

    return resourceList;
}

const {
    resourcesRequestFailed, 
    resourcesRequested, 
    resourcesReceived, 
} = slice.actions;

export default slice.reducer;

////////////////////////////////////////////////////////////////////////////////
// Action Creators
////////////////////////////////////////////////////////////////////////////////

export const loadResources = () => (dispatch, getState) => {
    const {user, name, token} = getState().entities.user;

    return dispatch(
        apiCallBegan({
            url: statusUrl + `?user=${user}&name=${name}&token=${token}`,
            onStart: resourcesRequested.type,
            onSuccess: resourcesReceived.type,
            onError: resourcesRequestFailed.type
        })
    );
};