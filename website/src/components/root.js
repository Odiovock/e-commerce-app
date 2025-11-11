import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";

function Root () {
    const [ cartContent, setCartContent] = useState(null);

    return (
        <>
            <Header cartContent={cartContent}/>
            <Outlet context={{cartContent, setCartContent}}/>
        </>
    );
}

export default Root;