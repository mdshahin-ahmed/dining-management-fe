import { Redirect, Route, Switch } from "react-router-dom";
import SignIn from "../pages/unauthenticated/SignIn";
import SignUp from "../pages/unauthenticated/SignUp";

function UnAuthenticatedApp() {
  console.log("unauth");

  return (
    <Switch>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="*" render={() => <Redirect to="/signin" />} />
    </Switch>
  );
}

export default UnAuthenticatedApp;
