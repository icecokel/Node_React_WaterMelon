import { useState, useEffect } from "react";
import { TabMode } from "../common/Enum";

const ChatTab = (props: any) => {
  const [mode, setMode] = useState<number>(TabMode.FRIENDS);
  const [friendList, setFriendList] = useState<Array<any>>();
  const [friendCount, setFriendCount] = useState<number>();
  const [chatRommList, setChatRoomList] = useState<Array<any>>();
  const callAPI: Function = props.callAPI;

  useEffect(() => {
    !friendCount && getFriendsList();
    !chatRommList && getChatRoomList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFriendsList = async () => {
    const res = await callAPI({
      url: "/user/getFriedList",
      method: "GET",
    });

    if (res) {
      setFriendList(res.items);
      setFriendCount(res.count);
    }
  };

  const getChatRoomList = async () => {
    // TODO 채팅방 목록 가져오기
    setChatRoomList([]);
  };

  const changeMode = () => {
    mode === TabMode.FRIENDS ? setMode(TabMode.ROOM) : setMode(TabMode.FRIENDS);
  };

  if (mode === TabMode.FRIENDS) {
    return (
      <div className="chatList_box">
        <div className="chatList_tab">
          <label className="friends_lbl_clicked" onClick={changeMode}>
            친구목록
          </label>
          <label className="room_lbl" onClick={changeMode}>
            대화방
          </label>
        </div>
        <div className="chatList_contents">
          <div className="chatList_friends">
            <div>
              친구{friendCount} 명
              <hr />
            </div>
            <ul>
              {friendList &&
                (friendList as Array<any>).map((item) => {
                  return <li>{item.nickname}</li>;
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="chatList_box">
        <div className="chatList_tab">
          <label className="friends_lbl" onClick={changeMode}>
            친구목록
          </label>
          <label className="room_lbl_clicked" onClick={changeMode}>
            대화방
          </label>
        </div>
        <div className="chatList_contents">
          <div className="chatList_room">채팅방 목록</div>
        </div>
      </div>
    );
  }
};

export default ChatTab;
