import React, { useState } from "react";
import SignInForm from "./signinform";
import SignUpForm from "./signupform";

function Authentication () {
    const [isLogin, setIsLogin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    if (isLogin) {
        return (
            <SignInForm onToggleSignUp={() => setIsLogin(false)}/>
        );
    } else {
        return (
            <SignUpForm onToggleSignIn={() => setIsLogin(true)}/>
        );        
    }
}

export default Authentication