import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import "react-phone-input-2/lib/style.css";
import { ToastContainer,Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "../components";
import Home from "./index";
import Login from "./user/login";
import Axios from "./utils/axios";

const MyApp = ({ Component, pageProps }: AppProps) => {
  //**Rakibul Part */
  const { user, token, logout } = Axios();
  const router = useRouter();

  const parseJwt = (token: any) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      const decodedJwt = parseJwt(token);
      if (decodedJwt?.exp * 1000 < Date.now()) {
        logout();
      }
    }
  }, [user, token, router.pathname]);
  //**Rakibul Part */

  /**Part of Permission check Module.department.action */

  let isAllowed = true;
  if (typeof window !== "undefined") {
    if (user?.permissions) {
      const val = Object.entries(user?.permissions) || {};
      const filtered = val?.map((item: any, index: any) => item[1].access_code);
      //console.log(filtered);  //Open to check permission sets
      //const accesurl = router.pathname.match("/employee") || {}
      for (let item of filtered) {
        const arr = JSON.stringify(item).split(".");
        /**index 0-> module, 1->department, 2->actions */
        if (arr[0].match("super") && arr[1].match("admin")) {
          isAllowed = true;
          break;
        }
        if (!router.pathname.match(arr[1])) {
          //Department wise access implimented
          isAllowed = false; //switch allow / disallow
        } else {
          isAllowed = true;
          break;
        }
      }
    }
  }
  const ComponentToRender = isAllowed ? Component : Home;
  /**Part of Permission check End*/

  if (typeof window !== "undefined") {
    if (!user) {
      return (
        <>
          <Login />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            closeOnClick
            pauseOnHover
            transition={Slide}
          />
        </>
      );
    }
  }

  return (
    <Layout>
      <ComponentToRender {...pageProps} />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
        transition={Slide}
      />
    </Layout>
  );
};
export default MyApp;
