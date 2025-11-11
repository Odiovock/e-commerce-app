import React, {useEffect, useState} from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "../../style/signin.module.css";

function SignInForm ({onToggleSignUp}) {
    const navigate = useNavigate();
    const {setCartContent} = useOutletContext();

    useEffect(() => {
        document.title = "Drugs.Co - Sign In";
    }, []);
    
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
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (!response.ok) {
                throw new Error(reportError.body);
            }

            const data = await response.json();
            setCartContent(data.user.cartContent);

            navigate({
                pathname: "/home"
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSignInOnSubmit} className={styles.mainForm}>
                <div className={styles.formElement}>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={onEmailInputChange} 
                        className={styles.input}
                        placeholder=" "
                        required
                    />
                    <label htmlFor="email" className={styles.label}>Email</label>
                </div>
                <div className={styles.formElement}>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={onPasswordInputChange} 
                        className={styles.input}
                        placeholder=" "
                        required
                    />
                    <label htmlFor="password" className={styles.label}>Password</label>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Sign in</button>
                    <button onClick={onSignUpClick} className={`${styles.button} ${styles.secondaryButton}`}>Sign up</button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;