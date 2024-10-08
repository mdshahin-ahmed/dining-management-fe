import { Route, Routes } from "react-router-dom";
import Home from "../../pages/authenticated/Home";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/home">
        <Home />
      </Route>
      {/* <Route path="*" render={() => <Redirect to="/home" />} /> */}
    </Routes>
  );
}

export default AuthenticatedApp;
