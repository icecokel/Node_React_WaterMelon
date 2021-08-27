import { useEffect } from "react";

const Main = (props: any) => {
  useEffect(() => {
    loginCheck();
  }, []);

  const loginCheck = () => {
    const local = window.localStorage.getItem("accountInfo");
    const localData = local ? JSON.parse(local) : "";
    const permittedPeriod = localData.rememberDate + 86400 * 1000 * 30;

    if (permittedPeriod <= Date.now()) {
      window.sessionStorage.setItem("accountInfo", localData.email);
    }
    const session = window.sessionStorage.getItem("accountInfo");

    !!session && props.setIsLogined(true);
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
  return (
    <div className="chat_box">
      채팅창
      <div className="chat_target_box">대상 닉네임</div>
      <div className="chat_content_box">대화내용</div>
      <div className="chat_send_Message_box">
        <input type="text" className="chat_send_Message" />
        <button className="chat_send_btn"> 전송</button>
      </div>
    </div>
  );
};

export default Main;
