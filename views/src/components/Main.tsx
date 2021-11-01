import { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import ChatTab from "./ChatTab";
import Header from "./Header";
import { PagePath } from "../common/Enum";
let webSocket: WebSocket;

const Main = (props: any) => {
  const callAPI: Function = props.callAPI;
  const [isOnReady, setIsOnReady] = useState<boolean>(false);

  const webSocketInit = () => {
    const webSocketUrl = process.env.REACT_APP_BASEURL_WEBSOCKER;

    if (webSocketUrl) {
      webSocket = new WebSocket(webSocketUrl);
    }
    if (!isOnReady) {
      webSocket.onopen = (e) => {
        console.info("Server Connected");
        setIsOnReady(true);
      };
    }
    webSocket.onclose = (e) => {
      console.error("Re Try Server Connecting...");
      webSocketInit();
      setIsOnReady(false);
    };
    webSocket.onerror = (e) => {
      console.error(`WebSocket Error : ${e}`);
      setIsOnReady(false);
    };
  };

  useEffect(() => {
    !props.isLogined && loginCheck();

    webSocketInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginCheck = async () => {
    const res = await callAPI({
      url: "/user/check",
      method: "GET",
    });
    window.sessionStorage.setItem("nickname", res.nickname);
    props.setIsLogined(res.isLogined);

    if (!res.isLogined) {
      props.history.push(PagePath.Login);
    }
  };
  return (
    <>
      <Header
        setIsLogined={props.setIsLogined}
        callAPI={callAPI}
        webSocket={webSocket}
      />
      <div className="main_box">
        <ChatTab
          key="chatTab_1"
          callAPI={callAPI}
          isLogined={props.isLogined}
        />
        <ChatRoom
          key="chatbox_1"
          webSocket={webSocket}
          isOnReady={props.isOnReady}
        />
      </div>
    </>
  );
};

export default Main;
