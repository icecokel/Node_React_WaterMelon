import { useEffect, useState } from "react";

const defaultData = {
  accountInfo: {
    email: "",
    nickName: "",
  },
};

const Header = (props: any) => {
  const [accountInfo, setAccountInfo] = useState<any>(defaultData.accountInfo);

  useEffect(() => {
    const localData = window.sessionStorage.getItem("accountInfo");
    localData && setAccountInfo(JSON.parse(localData));
  }, []);

  const onClickLogout = () => {
    window.sessionStorage.removeItem("accountInfo");
    window.localStorage.removeItem("accountInfo");
    props.setIsLogined(false);
  };
  return (
    <header className="header_box">
      <div>Logo</div>
      <div className="account_info_box">
        <span> {accountInfo.nickName}</span>
        <label onClick={onClickLogout}>로그아웃</label>
      </div>
    </header>
  );
};

export default Header;
