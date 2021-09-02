import { useEffect } from "react";
import FrontConfig from "../frontConfig";
import moment from "moment";

const Main = (props: any) => {
  const callAPI: Function = props.callAPI;

  useEffect(() => {
    loginCheck();
    // eslint-disable-next-line no-useless-escape
  }, []);

  const loginCheck = async () => {
    const res = await callAPI({
      url: "/user/check",
      method: "GET",
    });
    window.sessionStorage.setItem("nickName", res.nickName);
    props.setIsLogined(res.isLogined);
  };
  return (
    <div className="main_box">
      <ChatListBox />
      <ChatBox />
    </div>
  );
};

const ChatListBox = (props: any) => {
  return <div className="chatList_box">채팅방 목록</div>;
};

const ChatBox = (props: any) => {
  const sendMessage = () => {
    const webSocket: WebSocket = new WebSocket(FrontConfig.webSocker.baseUrl);

    webSocket.onopen = (e) => {
      webSocket.send("232");
    };

    webSocket.onmessage = (e) => {
      console.log(e);
    };
  };

  return (
    <div className="chat_box">
      채팅창
      <div className="chat_target_box">대상 닉네임</div>
      <div className="chat_content_box">대화내용</div>
      <div className="chat_send_Message_box">
        <input type="text" className="chat_send_Message" />
        <button className="chat_send_btn" onClick={sendMessage}>
          전송
        </button>
      </div>
    </div>
  );
};

export default Main;
