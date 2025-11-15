import React, { use, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";

function Root () {
    const [ cartContent, setCartContent] = useState(null);
    const [cartItemCount, setCartItemCount] = useState(0);  

    useEffect(() => {
        document.title = "Drugs.Co";
        // Update cart item count whenever cart content changes
        if (cartContent) {
            const itemCount = cartContent.reduce((total, item) => total + item.quantity, 0);
            setCartItemCount(itemCount);
        } else {
            setCartItemCount(0);
        }
    }, [cartContent]);

    useEffect(() => {
        async function fetchCartContent () {
            try {
                const response = await fetch("http://localhost:3000/carts/content", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"  // This will send cookies with the request
                });

                if (!response.ok) {
                    throw new Error("Could not fetch cart content");
                }
                const result = await response.json();
                setCartContent(result);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCartContent();
    }, []); 



    return (
        <>
            <Header cartItemCount={cartItemCount}/>
            <Outlet context={{cartContent, setCartContent}}/>
        </>
    );
}

export default Root;