import { useState } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import "./styles/box.scss";
import "./styles/component.scss";

import Header from "./components/Header";
import Login from "./components/Login";
import Main from "./components/Main";
import { config } from "yargs";

const callAPI = async (props: { url: string; method: string; data: any }) => {
  const reg = /GET|POST|PUT|DELETE/gi;
  let result: any = "";
  if (!reg.test(props.method)) {
    return;
  }

  switch (props.method.toUpperCase()) {
    case "GET":
      result = await axios.get(props.url, { params: props.data });
      break;
    case "POST":
      result = await axios.post(props.url, { params: props.data });
      break;
    case "PUT":
      result = await axios.put(props.url, { params: props.data });
      break;
    case "DELETE":
      result = await axios.delete(props.url, { params: props.data });
      break;
  }

  return result.data;
};

const App = () => {
  const [isLogined, setIsLogined] = useState<boolean>(false);
  return (
    <body>
      <Router>
        <Header />
        <section>
          <article className="main">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Main
                    {...props}
                    setIsLogined={setIsLogined}
                    callAPI={callAPI}
                  />
                )}
              />
            </Switch>
          </article>
        </section>
      </Router>

      {!isLogined && (
        <div className="modal">
          <Login callAPI={callAPI} />
        </div>
      )}
    </body>
  );
};

export default App;
