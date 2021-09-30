import logo from "../styles/images/logoColor.png";
import { useHistory } from "react-router";
const Logo = (props: { gotoMain: boolean }) => {
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
