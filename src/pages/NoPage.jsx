import React from "react";
import { useRouteError } from "react-router-dom";

function NoPage() {
    const error = useRouteError();
    console.error(error);
    
    return (
        <div>
           Page not found!
        </div>
    )
}

export default NoPage;