import { useState, useEffect } from "react";
import axios from "axios";
import { loadingIndicatorCSS } from "react-select/dist/declarations/src/components/indicators";
import { useRouter } from 'next/router';

const getToken = () => {
    const [token, setToken]:any = useState<any[]>([]);
    const [load, setLoad] = useState(true);
    const router = useRouter();
    //const[userData, setUserData] = useState();
    //const [tkn, setTkn] = useState<boolean>(true);
    //return tkn;
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
    },[load]);


    function logout(){
        localStorage.clear();
        router.push('/user/login')
    }

    let http = axios.create({
        headers: {
            Authorization: `Bearer ${token.response}`
        }
    });


    return {token,http, load,logout};
}

export {getToken}