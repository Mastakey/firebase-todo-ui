import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

//Components
import Navbar from "./components/nav/Navbar";
import Alerts from "./components/alerts/Alerts";

//Routes
import Home from "./routes/Home";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Signup from "./routes/Signup";
    
//Project
import projectAll from "./routes/project/projectAll";
import projectView from "./routes/project/projectView";
import projectCreate from "./routes/project/projectCreate";
import projectEdit from "./routes/project/projectEdit";
    
//Todo
import todoAll from "./routes/todo/todoAll";
import todoView from "./routes/todo/todoView";
import todoCreate from "./routes/todo/todoCreate";
import todoEdit from "./routes/todo/todoEdit";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTH } from "./redux/types";
import { getUserData } from "./redux/actions/userActions";

//Auth
import jwtDecode from "jwt-decode";
import axios from "axios";

axios.defaults.baseURL = "https://us-central1-todo-6d12f.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  //console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    //Expired token
    //window.location.href = '/login';
    //store.dispatch(logoutUser());
    //window.location.href = '/';
  } else {
    store.dispatch({ type: SET_AUTH });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Alerts />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/project" component={projectAll} />
              <Route exact path="/project/create" component={projectCreate} />
              <Route exact path="/project/:id" component={projectView} />
              <Route exact path="/project/edit/:id" component={projectEdit} />
              <Route exact path="/todo" component={todoAll} />
              <Route exact path="/todo/create" component={todoCreate} />
              <Route
                exact
                path="/project/:id/todo/create"
                component={todoCreate}
              />
              <Route exact path="/todo/:id" component={todoView} />
              <Route exact path="/todo/edit/:id" component={todoEdit} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
