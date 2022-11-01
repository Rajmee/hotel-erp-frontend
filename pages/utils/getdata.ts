import { useState, useEffect } from "react";
import Axios from 'axios'
import { loadingIndicatorCSS } from "react-select/dist/declarations/src/components/indicators";
import { useRouter } from 'next/router';

const getToken = () => {
    const [token, setToken]:any = useState([]);
    const [load, setLoad] = useState(true);
    const router = useRouter();
    //const[userData, setUserData] = useState();
    //const [tkn, setTkn] = useState<boolean>(true);
    //return tkn;

        //get user string
        // function getUser(){
        //     if (typeof window !== 'undefined') {
      
        //       const userString = localStorage.getItem('user');
        //       const user_detail = JSON.parse(userString);
        //       return user_detail;
        //     }
        //   }
      
        // const [user,setUser] = useState(getUser())



    useEffect(() =>{
         setLoad(true)
        // let abortController:any = new AbortController(); 
        try{
                if(!!localStorage.getItem('response') == false){
                    setToken(false)
                     setLoad(false);
                }
                else{
                    setToken({
                        response: localStorage.getItem('response'),
                        status: localStorage.getItem('status'), 
                        user: localStorage.getItem('user'),
                    });
                    setLoad(false);
                    return token;
                }
        }catch(e:any) {
            setToken(true);
            setLoad(false)
            throw e;
        }
    // return () => {
    //     abortController.abort();
    //     }
    },[]);



    function logout(){
        localStorage.clear();
        window.location.reload();
    }

    const http = Axios.create({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: `Bearer ${token.response}`,
        },
        // withCredentials: true,
    });


    return {token,http, load,logout};
}

export {getToken}