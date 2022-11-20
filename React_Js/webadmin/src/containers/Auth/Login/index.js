import './index.scss';
import FormLeft from "../FormLeft/index";
import FormRight from "../FormRight/index";

function Login() {
  return (
    <div className="flex-container">
      <div className="flex-item-left">
         <FormLeft/>
      </div>
      <div className="flex-item-right">
         <FormRight/>
      </div>
    </div>
  );
}

export default Login;