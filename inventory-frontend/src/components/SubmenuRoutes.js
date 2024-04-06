import React from 'react';
import { Routes, Route, useRouteMatch, Navigate } from 'react-router-dom';
import Overview from '../page/Overview'; 
import Analytics from '../page/Analytics'; 
import PageNotFound from '../page/PageNotFound'; 

const SubmenuRoutes = () => {
    let { path } = useRouteMatch();

    return (
        <Routes>
            <Route path={`${path}/overview`} element={<Overview />} />
            <Route path={`${path}/analytics`} element={<Analytics />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    );
};

export default SubmenuRoutes;
