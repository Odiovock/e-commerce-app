import React, {useEffect, useState} from "react";
import { Outlet, useNavigate } from "react-router-dom";


function HomePage () {
    const navigate = useNavigate();
    const [isSearching, setIsSearching] = useState(false);

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