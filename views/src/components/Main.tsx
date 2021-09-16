import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FrontConfig from "../frontConfig";

export enum TabMode {
  FRIENDS = 0,
  ROOM = 1,
}

const Main = (props: any) => {
  const callAPI: Function = props.callAPI;

  useEffect(() => {
    loginCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <ChatTab />
      <ChatBox />
    </div>
  );
};

const ChatTab = (props: any) => {
  const [mode, setMode] = useState<number>(TabMode.FRIENDS);

  const onClickTab = (props: number) => {
    setMode(props);
  };

  // TODO 방 목록 및 친구 목록 디자인.
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
            onClickTab(TabMode.FRIENDS);
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
            onClickTab(TabMode.ROOM);
          }}
        >
          대화방
        </label>
      </div>
      <div className="chatList_contents">
        {mode === TabMode.FRIENDS && (
          <div className="chatList_friends">adad</div>
        )}
        {mode === TabMode.ROOM && <div className="chatList_room">dfdf</div>}
      </div>
    </div>
  );
};

const webSocket: WebSocket = new WebSocket(FrontConfig.webSocker.baseUrl);
webSocket.onopen = (e) => {
  console.log(e);
  console.info("Server Connected");
};

const ChatBox = (props: any) => {
  const [message, setMessage] = useState<string>("");
  const [receivedMessage, setReceivedMessage] = useState<Array<string>>([]);

  useEffect(() => {}, [receivedMessage]);

  webSocket.onmessage = (e) => {
    const msgObj = JSON.parse(e.data);
    const tempReceivedMessageList = receivedMessage;
    tempReceivedMessageList.push(msgObj.message);

    // TODO 렌더링 속도 개선
    setReceivedMessage(tempReceivedMessageList);
  };

  const sendMessage = () => {
    // 메시지 및 Sender 추가
    webSocket.send(message);
    setMessage("");
  };

  const onPressEnter = (e: any) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat_box">
      채팅창
      <div className="chat_target_box">대상 닉네임</div>
      <div className="chat_content_box">
        {receivedMessage.map((item) => {
          return <div>{item}</div>;
        })}
      </div>
      <div className="chat_send_Message_box">
        <input
          type="text"
          value={message}
          onKeyPress={onPressEnter}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
};

export default Main;
