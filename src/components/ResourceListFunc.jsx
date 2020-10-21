import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadResources } from '../store/resources';

const ResourceListFunc = () => {
    const dispatch = useDispatch();
    const resources = useSelector(state => state.entities.resources.list);

    useEffect(() => {
        dispatch(loadResources());
    }, []);

    return (
        <ul>
            {resources.map((resource) => (
                <li key={resource.evseId}>{`${resource.resourceStatus} ${resource.realPower}`}</li>
            ))}
        </ul>
    );
}