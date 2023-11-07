import React from "react";
import { useState , useEffect} from "react";
import { useOktaAuth } from "@okta/okta-react";

function LoginHandler( props ){
    const { oktaAuth, authState } = useOktaAuth();
    const [ user , setUser ] = useState(null);

    useEffect( () => { 
        if(authState && authState.isAuthenticated) { 
            oktaAuth.getUser(authState.accessToken.accessToken).then( (result) => {
                setUser(result.email)
            } )
        }
      }, [authState] );

      if(!authState) {
        console.log(oktaAuth)
        return <div><h1>Loading...</h1></div>;
      }

    return (<div>
        <h1>Type : {props.UserType == 1 ? "Pat" : ( props.UserType == 2 ? "Doc" : "None" )}</h1>
        <h1>Okta Stuff : {(authState && authState.isAuthenticated)? oktaAuth.getUser() : ("Not Logged In "+authState)}</h1>
        <h1>Okta Auth : {user}</h1>
    </div>)
}

export default LoginHandler