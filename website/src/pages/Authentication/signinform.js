import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function SignInForm ({onToggleSignUp}) {
    const navigate = useNavigate();

    document.title = "Sign In";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onEmailInputChange (event) {
        setEmail(event.target.value);
    }

    function onPasswordInputChange (event) {
        setPassword(event.target.value);
    }

    function  onSignUpClick (e) {
        e.preventDefault();
        onToggleSignUp();
    }

    async function handleSignInOnSubmit (e) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (!response.ok) {
                throw new Error(reportError.body);
            }

            navigate({
                pathname: "/home"
            })
        } catch (error) {
            console.log(error.body);
        }
    }

    return (
        <div>
            <form onSubmit={handleSignInOnSubmit}>
                <label htmlFor="email">User name</label>
                <input id="email" type="email" value={email} onChange={onEmailInputChange}/>
                <label htmlFor="password">password</label>
                <input id="password" type="password" value={password} onChange={onPasswordInputChange}/>
                <button type="submit">Sign in</button>
                <button onClick={onSignUpClick}>Sign up</button>
            </form>
        </div>
    );
}

export default SignInForm;