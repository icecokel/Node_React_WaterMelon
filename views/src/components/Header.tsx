import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { PagePath } from "../common/Enum";
import Logo from "./Logo";
const Header = (props: any) => {
  const callAPI: Function = props.callAPI;
  const [nickname, setNickname] = useState<string>("");
  const history = useHistory();

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
    history.push(PagePath.Login);
  };

  return (
    <header className="header_box">
      <Logo gotoMain={true} />
      <div className="account_info_box">
        {nickname ? (
          <>
            <span id="nickname"> {nickname}</span>
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
