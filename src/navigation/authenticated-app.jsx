import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../pages/authenticated/Home";

function AuthenticatedApp() {
  return (
    <Switch>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="*" render={() => <Redirect to="/home" />} />
    </Switch>
  );
}

export default AuthenticatedApp;
