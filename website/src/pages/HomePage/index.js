import React, {useEffect, useState} from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";


function HomePage () {
    const navigate = useNavigate();
    const [isSearching, setIsSearching] = useState(false);
    const { cartContent, setCartContent} = useOutletContext();

    useEffect(() => {
        if (!isSearching) {
            navigate("products");
        }
    }, [isSearching, navigate]);

    return (
        <>
            <Outlet/>
        </>
    )
}

export default HomePage;