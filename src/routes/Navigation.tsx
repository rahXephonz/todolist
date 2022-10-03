import ROUTES from "./Routes";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const Navigation = () => {
  return (
    <Router>
      <Switch>
        {ROUTES.PUBLIC.map((routes) => (
          <Route
            key={routes.NAME}
            path={routes.PATH}
            component={routes.COMPONENT}
          />
        ))}
        <Redirect to={ROUTES?.PUBLIC[0]?.PATH || "/"} />
      </Switch>
    </Router>
  );
};

export default Navigation;
