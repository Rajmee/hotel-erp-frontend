import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

//import "./login.scss";


const Authenticate = ({ children, role }: any) => {

const router = useRouter();

    const [session, setSession]:any = useState(null);
    const [load, setLoad] = useState<boolean>(false);

    const [user, setUser]:any = useState(null);


    useEffect(()=> {
         let abortController = new AbortController(); 

        try{
            if(!!localStorage.getItem('user') && localStorage.getItem('status') == "success"){

                fetch('/api/auth/user').then((u) => u.json().then(setUser))
                
                if(router.pathname === "/user/login"){
                        router.push('/profile/user/','/profile/user/main');
                }
                
            }else {

                setUser(true) // set to true.
                const redirectURI = router.pathname
                const url = { pathname: '/user/login', query: { redirect_uri: redirectURI, data: session } }
                router.push(url, undefined, { shallow: true })
            }
        }
        catch(e){
            throw e;
        }
    
         return () => {
            abortController.abort();
            }
        setLoad(true);
    },[load]);

    return !user && <div className="loader">Loading...</div> || children
};

export {Authenticate};