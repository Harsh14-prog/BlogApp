import Auth from "../component/Auth";
import { Quote } from "../component/Quote";

const SignIn = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <Auth type="signin"/>
      </div>

      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};

export default SignIn;
