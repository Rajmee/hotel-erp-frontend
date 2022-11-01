import { getToken } from "../pages/utils/getdata";
import Customizer from "./Customizer";
import Footer from "./Footer";
import LeftSidebar from "./LeftSidebar";
import NavBar from "./NavBar";


const Layout=({children} )=> {
  const { token} = getToken();


  return (
    <>

        <div id="main-wrapper">

        <NavBar/>

        <LeftSidebar />
        {/* Page-wrapper */}
        <div className="page-wrapper">
          {/* <div className="container-fluid "> */}
            {children}
          {/* </div> */}

          <Footer />
        </div>

        {/* end page-wrapper */}
        </div>

        <div>
        {/* <Customizer /> */}
        <div className="chat-windows" />
        </div>

    </>
  );
}

export default Layout;
