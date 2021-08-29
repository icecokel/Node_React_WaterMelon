import { useState } from "react";

import watermelon from "../resources/watermelon01.jpg";

const Login = (props: any) => {
  const callAPI: Function = props.callAPI;

  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
    remember: false,
  });

  const validationCheck = () => {
    const regEmail =
      // eslint-disable-next-line no-useless-escape
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    return regEmail.test(formData.email) && !!formData.password;
  };

  const onClinkLogin = async () => {
    if (!validationCheck()) {
      alert("Check Your Password And Email ...");
      return;
    }

    const res = await callAPI({
      url: "/user/login",
      method: "POST",
      data: formData,
    });

    if (res.result) {
      if (formData.remember) {
        const settingLocalData = {
          rememberDate: new Date().getTime(),
          email: res.email,
        };
        window.localStorage.setItem(
          "accountInfo",
          JSON.stringify(settingLocalData)
        );
      }
      const settingSessionData = {
        email: res.email,
        nickName: res.nickName,
      };

      window.sessionStorage.setItem(
        "accountInfo",
        JSON.stringify(settingSessionData)
      );
      props.setIsLogined(true);
    }
  };
  return (
    <article className="login_box">
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
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
            <input
              type="password"
              value={formData.password}
              autoComplete="off"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </form>
          <div className="login_question">
            <label>
              <input
                type="checkbox"
                onChange={(e) => {
                  setFormData({ ...formData, remember: e.target.checked });
                }}
              />{" "}
              Remember?
            </label>

            <label className="forget_password_lbl">Forgot Password</label>
          </div>
          <div>
            <button className="login_regist_btn" onClick={onClinkLogin}>
              로그인
            </button>
            <button className="login_regist_btn">가입하기</button>
          </div>
          <div>
            <ul>
              <li>구글 아이콘</li>
              <li>네이버 아이콘</li>
              <li>카카오 아이콘</li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Login;
