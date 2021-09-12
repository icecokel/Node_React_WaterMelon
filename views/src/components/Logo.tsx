// TODO 이미지 파일 수정 예정.
import logo from "../styles/images/logoColor.png";
import { useHistory } from "react-router";
const Logo = (props: { gotoMain: boolean }) => {
  // TODO : 네이밍
  const history = useHistory();

  const onClickLogo = () => {
    if (props.gotoMain) {
      history.push("/");
    }
  };
  return (
    <div className="logo_box">
      <label onClick={onClickLogo}>
        <img src={logo} alt="logo_img" />
      </label>
    </div>
  );
};

export default Logo;
