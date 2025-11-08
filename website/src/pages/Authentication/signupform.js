import React, {useEffect, useState} from "react";
import styles from "../../style/signup.module.css";

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
        <div className={styles.container}>
            <form onSubmit={handleOnSignUpSubmit} className={styles.mainForm}>
                <div className={styles.formElement}>
                    <input type="text" id="firstName" value={firstName} onChange={onFirstNameInputChange} className={styles.input} placeholder=" " required/>
                    <label htmlFor="firstName" className={styles.label}>First name</label>
                </div>
                <div className={styles.formElement}>
                    <input type="text" id="lastName" value={lastName} onChange={onLastNameInputChange} className={styles.input} placeholder=" " required/>
                    <label htmlFor="lastName" className={styles.label}>Last name</label>
                </div>
                <div className={styles.formElement}>
                    <input type="email" id="email" value={email} onChange={onEmailInputChange} className={styles.input} placeholder=" " required/>
                    <label htmlFor="email" className={styles.label}>Email</label>
                </div>
                <div className={styles.formElement}>
                    <input type="text" id="phone" value={phone} onChange={onPhoneInputChange} className={styles.input} placeholder=" " required/>
                    <label htmlFor="phone" className={styles.label}>Phone</label>
                </div>
                <div className={styles.formElement}>
                    <input type="password" id="password" value={password} onChange={onPasswordInputChange} className={styles.input} placeholder=" " required/>
                    <label htmlFor="password" className={styles.label}>Password</label>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Sign Up</button>
                    <button onClick={onSignInCLick} className={`${styles.button} ${styles.secondaryButton}`}>Sign In</button>
                </div>
            </form>
        </div>
    );
}

export default SignUpForm;