import React, {useEffect, useState} from "react";

function SignUpForm ({onToggleSignIn}) {
    document.title = "Sign Up";
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    function onSignInCLick (e) {
        e.preventDefault();
        onToggleSignIn();
    }

    async function handleOnSignUpSubmit (e) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    phone,
                    password
                })
            });

            if (!response.ok) {
                throw new Error(`Registration status: ${response.status}`);
            }

            console.log(response);
            onToggleSignIn()
        } catch (error) {
            console.log(error);
        }
    }

    function onFirstNameInputChange (event) {
        setFirstName(event.target.value);
    }

    function onLastNameInputChange (event) {
        setLastName(event.target.value);
    }

    function onEmailInputChange (event) {
        setEmail(event.target.value);
    }

    function onPhoneInputChange (event) {
        setPhone(event.target.value);
    }

    function onPasswordInputChange (event) {
        setPassword(event.target.value);
    }

    return (
        <div>
            <form onSubmit={handleOnSignUpSubmit}>
                <label htmlFor="firstName">First name</label>
                <input type="text" id="firstName" value={firstName} onChange={onFirstNameInputChange}required/>
                <label htmlFor="lastName">Last name</label>
                <input type="text" id="lastName" value={lastName} onChange={onLastNameInputChange} required/>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={onEmailInputChange} required/>
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" value={phone} onChange={onPhoneInputChange} required/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={onPasswordInputChange} required/>
                <button type="submit">Sign Up</button>
                <button onClick={onSignInCLick}>Sign In</button>
            </form>
        </div>
    );
}

export default SignUpForm;