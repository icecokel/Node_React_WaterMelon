import { useState } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import "./styles/style.scss";

import Header from "./components/Header";
import Login from "./components/Login";
import Main from "./components/Main";

const callAPI = async (props: { url: string; method: string; data: any }) => {
  let result: any = "";

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

    default:
      result = {
        data: "메소드를 GET, POST, PUT, DELETE. 중 하나를 선택 하세요.",
      };
  }

  return result.data;
};

const App = () => {
  const [isLogined, setIsLogined] = useState<boolean>(false);

  return (
    <main>
      <Router>
        <Header setIsLogined={setIsLogined} callAPI={callAPI} />
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
            {!isLogined && (
              <Login callAPI={callAPI} setIsLogined={setIsLogined} />
            )}
          </article>
        </section>
      </Router>
    </main>
  );
};

export default App;
