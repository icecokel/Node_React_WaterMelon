import { useEffect, useState } from "react";

import watermelon from "../styles/images/watermelon01.jpg";
import google from "../styles/images/google_icon.png";
import kakao from "../styles/images/kakao_icon.png";
import naver from "../styles/images/naver_icon.png";
import { PagePath } from "../common/Enum";
const Login = (props: any) => {
  const callAPI: Function = props.callAPI;

  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
    isRemember: false,
  });

  useEffect(() => {
    loginCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isLogined]);

  const onPressEnter = (e: any) => {
    if (e.key === "Enter") {
      onClinkLogin();
    }
  };

  const onClickSocial = (props: string) => {
    switch (props) {
      case "google":
        alert("준비중인 서비스 입니다");
        break;
      case "kakao":
        alert("준비중인 서비스 입니다");
        break;
      case "naver":
        alert("준비중인 서비스 입니다");
        break;
      default:
        alert("준비중인 서비스 입니다");
    }
  };

  const validationCheck = () => {
    const regEmail =
      // eslint-disable-next-line no-useless-escape
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    return regEmail.test(formData.email) && !!formData.password;
  };

  const onClinkLogin = async () => {
    if (!validationCheck()) {
      alert("계정정보를 확인 해 주세요.");
      return;
    }

    const res = await callAPI({
      url: "/user/login",
      method: "POST",
      data: formData,
    });

    if (res.error) {
      alert("계정정보를 확인 해 주세요.");
    } else {
      window.sessionStorage.setItem("nickname", res.nickname);
      props.setIsLogined(res.isLogined);
      props.history.push(PagePath.Main);
    }
  };

  const loginCheck = async () => {
    const res = await callAPI({
      url: "/user/check",
      method: "GET",
    });
    window.sessionStorage.setItem("nickname", res.nickname);
    props.setIsLogined(res.isLogined);

    if (res.isLogined) {
      props.history.push("/");
    }
  };
  return (
    <div className="login_box">
      <div className="box">
        <div className="image_box">
          <img src={watermelon} alt="loginImg" className="login_big_img" />
        </div>
        <div className="login_content">
          <h2>로그인</h2>
          <form>
            <input
              type="email"
              value={formData.email}
              onKeyPress={onPressEnter}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
            <input
              type="password"
              value={formData.password}
              autoComplete="off"
              onKeyPress={onPressEnter}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                });
              }}
            />
          </form>
          <div className="login_question">
            <label>
              <input
                type="checkbox"
                onChange={(e) => {
                  setFormData({ ...formData, isRemember: e.target.checked });
                }}
              />
              로그인 상태 유지
            </label>

            <label className="forget_password_lbl">비밀번호 찾기</label>
          </div>
          <div className="btn_box">
            <button onClick={onClinkLogin}>로그인</button>
            <button>가입하기</button>
          </div>
          <div>
            <ul className="icon_ul">
              <li>
                <label
                  onClick={() => {
                    onClickSocial("");
                  }}
                >
                  <img src={google} alt="google_icon" />
                </label>
              </li>
              <li>
                <label
                  onClick={() => {
                    onClickSocial("");
                  }}
                >
                  <img src={kakao} alt="kakao_icon" />
                </label>
              </li>
              <li>
                <label
                  onClick={() => {
                    onClickSocial("");
                  }}
                >
                  <img src={naver} alt="naver_icon" />
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
