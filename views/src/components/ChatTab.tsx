import { useState, useEffect } from "react";

export enum TabMode {
  FRIENDS = 0,
  ROOM = 1,
}

const ChatTab = (props: any) => {
  const [mode, setMode] = useState<number>(TabMode.FRIENDS);
  const [friendList, setFriendList] = useState<Array<any>>();
  const [friendCount, setFriendCount] = useState<number>();
  const callAPI: Function = props.callAPI;

  useEffect(() => {
    friendList || getFriendsList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendList]);

  const getFriendsList = async () => {
    // id를 가지고 친구 목록 가져오기
    const res = await callAPI({
      url: "/user/getFriedList",
      method: "GET",
    });

    console.log(res);

    if (res) {
      setFriendList(res.items);
      setFriendCount(res.count);
    }
  };

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
          <div className="chatList_friends">
            <ul>
              {friendList &&
                (friendList as Array<any>).map((item) => {
                  console.log(item);
                  return <li>{item.nickname}</li>;
                })}
            </ul>
          </div>
        )}
        {mode === TabMode.ROOM && (
          <div className="chatList_room">채팅방 목록</div>
        )}
      </div>
    </div>
  );
};

export default ChatTab;
