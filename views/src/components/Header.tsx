import { useEffect, useState } from "react";
import Logo from "./Logo";
const Header = (props: any) => {
  const callAPI: Function = props.callAPI;
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    getNickname();
  });

  const getNickname = () => {
    const sessionSavedNickname = window.sessionStorage.getItem("nickname");
    sessionSavedNickname && setNickname(sessionSavedNickname);
  };

  const onClickLogout = async () => {
    const res = await callAPI({
      url: "/user/logout",
      method: "POST",
    });

    props.webSocket.close();
    window.sessionStorage.clear();
    setNickname("");
    props.setIsLogined(res.isLogined);
  };
  return (
    <header className="header_box">
      <Logo gotoMain={true} />
      <div className="account_info_box">
        {nickname ? (
          <>
            <span> {nickname}</span>
            <label onClick={onClickLogout}>로그아웃</label>
          </>
        ) : (
          <span> 로그인 해주세요.</span>
        )}
      </div>
    </header>
  );
};

export default Header;
