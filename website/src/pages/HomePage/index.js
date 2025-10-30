import React, {useEffect, useState} from "react";

function signInForm () {
    return (
        <div>
            <form>
                <lable for="username">User name</lable>
                <input id="username" type="text"/>
                <label for="password">password</label>
                <input id="password" type="password"/>
            </form>
        </div>
    );
}

function signUpForm () {
    return (
        <div>

        </div>
    );
}

function HomePage () {
    const [isLogin, setIsLogin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    return (
        
    );
}

export default HomePage