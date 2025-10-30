import React from "react";
import {Outlet} from "react-router-dom";

function Root () {
    return (
        <>
            Hello world!
            <Outlet/>
        </>
    );
}

export default Root;