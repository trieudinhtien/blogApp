import Home from "./pages/home/Home";
import Topbar from "./components/topBar/Topbar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context);
  return (
    <div className="App">
      <Router>
        <Topbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/write'>
          {user ? <Write /> : <Register />}
          </Route>
          <Route path='/setting'>
          {user ? <Setting /> : <Register />}
          </Route>
          <Route path='/login'>
            {user ? <Home /> : <Login />}
          </Route>
          <Route path='/register'>
            {user ? <Home /> : <Register />}
          </Route>
          <Route path='/post/:userId'>
            <Single />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
