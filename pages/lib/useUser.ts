import { useEffect, useState } from 'react';
const UseUser = () => {
    const [session, setSession] = useState<boolean>(false);

    // useEffect(()=>{
        function getUser(){
        try{
            if(!!localStorage.getItem('user') == false){
                setSession(false)
            }
            else{
                setSession(true);
            }
            }catch(e) {
                throw e;
            }
            // });
            return session;
        }
}
export function getuser(){
    const [session, setSession] = useState<boolean>(false);
    useEffect(() =>{
        let abortController = new AbortController(); 
        try{
                if(!!localStorage.getItem('user') == false){
                    setSession(false)
                }
                else{
                    setSession(true);
                }
        }catch(e) {
            throw e;
        }
    return () => {
        abortController.abort();
        }
    });
    return session;
}

export function sum(a: number, b: number) {
    return a + b;
}


export function demo() {
    return "Hello";
}