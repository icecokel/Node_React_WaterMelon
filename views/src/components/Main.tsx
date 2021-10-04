import { useState, useEffect } from "react";
import FrontConfig from "../frontConfig";
import ChatRoom from "./ChatRoom";

export enum TabMode {
  FRIENDS = 0,
  ROOM = 1,
}

const Main = (props: any) => {
  const callAPI: Function = props.callAPI;
  const [receivedMessages, setReceivedMessages] = useState<Array<any>>([]);
  const nickname = window.sessionStorage.getItem("nickname");
  const webSocket: WebSocket = new WebSocket(FrontConfig.webSocker.baseUrl);
  const [isOnReady, setIsOnReady] = useState<boolean>(false);

  // TODO
  // 웹소켓 App로 이동 해야함.
  // 로그 아웃 할 때 소켓 클로즈 해야함
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
    const msgObj = JSON.parse(e.data);
    const tempReceivedMessageList = [...receivedMessages];
    tempReceivedMessageList.push(JSON.parse(msgObj.message));
    setReceivedMessages(tempReceivedMessageList);
  };

  const sendMessage = (message: string) => {
    const params = { nickname: nickname, message: message };
    isOnReady && webSocket.send(JSON.stringify(params));
  };

  useEffect(() => {
    // TODO
    // 의미없는 렌더링 개선 , useCallback , useMemo 사용 고려
    // 무한 로그인 체크 진행 중 확인 필요.
    !props.ioLogined && loginCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webSocket]);

  const loginCheck = async () => {
    const res = await callAPI({
      url: "/user/check",
      method: "GET",
    });
    window.sessionStorage.setItem("nickname", res.nickname);
    props.setIsLogined(res.isLogined);
  };
  return (
    <div className="main_box">
      <ChatTab key="chatTab_1" />
      <ChatRoom
        key="chatbox_1"
        receivedMessages={receivedMessages}
        sendMessage={sendMessage}
      />
    </div>
  );
};

const ChatTab = (props: any) => {
  const [mode, setMode] = useState<number>(TabMode.FRIENDS);

  return (
    <div className="chatList_box">
      <div className="chatList_tab">
        <label
          style={
            mode === TabMode.FRIENDS
              ? { backgroundColor: "#f28585", color: "#FFFFFF" }
              : {}
          }
          className="friends_lbl"
          onClick={() => {
            setMode(TabMode.FRIENDS);
          }}
        >
          친구목록
        </label>
        <label
          style={
            mode === TabMode.ROOM
              ? { backgroundColor: "#c2d991", color: "#FFFFFF" }
              : {}
          }
          className="room_lbl"
          onClick={() => {
            setMode(TabMode.ROOM);
          }}
        >
          대화방
        </label>
      </div>
      <div className="chatList_contents">
        {mode === TabMode.FRIENDS && (
          <div className="chatList_friends">친구 목록</div>
        )}
        {mode === TabMode.ROOM && (
          <div className="chatList_room">채팅방 목록</div>
        )}
      </div>
    </div>
  );
};

export default Main;
