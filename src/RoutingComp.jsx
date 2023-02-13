import React from 'react';
import { BrowserRouter,Route, Switch } from "react-router-dom";
import Dashboard from './app/components/dashboard/Dashboard';



function RoutingComp() {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Dashboard} />
        </Switch>
        </BrowserRouter>
    )
}

export default RoutingComp;
