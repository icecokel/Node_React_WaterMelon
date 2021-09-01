import { useEffect, useState } from "react";

const Header = (props: any) => {
  const callAPI: Function = props.callAPI;
  const [nickName, setNickName] = useState<string>("");

  useEffect(() => {
    getNickName();
  });

  const getNickName = () => {
    const sessionSavedNickName = window.sessionStorage.getItem("nickName");
    sessionSavedNickName && setNickName(sessionSavedNickName);
  };

  const onClickLogout = async () => {
    const res = await callAPI({
      url: "/user/logout",
      method: "POST",
    });

    window.sessionStorage.clear();
    setNickName("");
    props.setIsLogined(res.isLogined);
  };
  return (
    <header className="header_box">
      <div>Logo</div>
      <div className="account_info_box">
        {nickName ? (
          <>
            <span> {nickName}</span>
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
