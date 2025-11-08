import React from "react";
import {Outlet} from "react-router-dom";
import Header from "./header";

function Root () {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
}

export default Root;