import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { navigationService } from "../services";

// Public pages
import { NotFoundPage } from "./NotFoundPage/NotFoundPage.js";
// import { LandingPage } from './LandingPage';
// import { RegisterPage } from './RegisterPage';
// import { LoginPage } from './LoginPage';
// import { ForgotPasswordPage } from './ForgotPasswordPage';

// Protected pages
import DashboardPage from "./DashboardPage/DashboardPage.js";
import LeatherDeptPage from "./LeatherDeptPage/LeatherWorkflowChange.js";
import SewingDeptPage from "./SewingDeptPage/SewingWorkflowChange.js";
import ShippingTVPage from "./ShippingTV/ShippingTV.js";
import PickControl from "./PickControl/PickControl.js";
import HotStampPage from "./HotStampingPage/HotStampPage";
import InspectingPage from "./InspectingPage/InspectingPage";

export const Routes = withRouter(({ history }) => {
  navigationService.init(history);

  return (
    <Switch>
      <Route exact path={"/" || "/dashboard"} component={DashboardPage} />
      <Route exact path="/leather-workflow" component={LeatherDeptPage} />
      <Route exact path="/sewing-workflow" component={SewingDeptPage} />
      <Route exact path="/shipping-metrics" component={ShippingTVPage} />
      <Route exact path="/pick-control" component={PickControl} />
      <Route exact path="/hot-stamp" component={HotStampPage} />
      <Route exact path="/inspect" component={InspectingPage} />
      <Route path="/">
        <Switch>
          <Route component={NotFoundPage} />
        </Switch>
      </Route>
    </Switch>
  );
});
