import Layout from "./components/Layout";
import FirstInfo from "./pages/FirstInfo";
import SecondInfo from "./pages/SecondInfo";
import ThirdInfo from "./pages/ThirdInfo";

const Main = () => {
    return ( 
        <div className="body">
            <header >لطفا اطلاعات خود را وارد کنید</header>
            <ThirdInfo/>
        </div>

     );
}
 
export default Main;