import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Logout = () =>{

const router = useRouter();




     function removeSession(){
        try{
            localStorage.removeItem('user');
            localStorage.removeItem('status');
            localStorage.removeItem('response');
            router.push('/user/login',undefined, {shallow:true})
        }
        catch(e){
            throw e;
        }
    }

    try{
        removeSession();
    }
    catch(e){
        throw e;
    }

    // useEffect(()=>{
    //     removeSession();
    // })
    
    //router.push('/user/login')
    
    return <div className="loader">Loading...</div> 
  
}

//let nothing: void = Logout();
//module.exports = Logout;
export default Logout;