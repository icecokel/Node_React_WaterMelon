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

const webSocketUrl = process.env.REACT_APP_BASEURL_WEBSOCKER;

const App = () => {
  const [isLogined, setIsLogined] = useState<boolean>(false);

  const webSocket: WebSocket = new WebSocket("ws://localhost:1225");
  const [receivedMessages, setReceivedMessages] = useState<Array<any>>([]);
  const [isOnReady, setIsOnReady] = useState<boolean>(false);

  if (!isOnReady) {
    webSocket.onopen = (e) => {
      console.info("Server Connected");
      setIsOnReady(true);
    };
  }
  webSocket.onclose = (e) => {
    console.error("Re Try Server Connecting...");
    setIsOnReady(false);
  };
  webSocket.onerror = (e) => {
    console.error(`WebSocket Error : ${e}`);
    setIsOnReady(false);
  };

  webSocket.onmessage = (e: any) => {
    // 원인 파악이 필요
    const msgObj = JSON.parse(e.data);
    const tempReceivedMessageList = [...receivedMessages];
    tempReceivedMessageList.push(JSON.parse(msgObj.message));
    setReceivedMessages(tempReceivedMessageList);
  };

  return (
    <main>
      <Router>
        <Header
          setIsLogined={setIsLogined}
          callAPI={callAPI}
          webSocket={webSocket}
        />
        <section>
          <article className="main">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Main
                    {...props}
                    isLogined={isLogined}
                    setIsLogined={setIsLogined}
                    callAPI={callAPI}
                    isOnReady={isOnReady}
                    webSocket={webSocket}
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
