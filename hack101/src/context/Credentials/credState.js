import React from "react";
import CredContext from "./credContext";
import { useState } from "react";
const CredState = (props) => {
    const [credentials, setCredentials] = useState({ notloggedin: 'notloggedin' })

    return (
        <CredContext.Provider value={{ credentials, setCredentials }}>
            {props.children}
        </CredContext.Provider>
    )

}

export default CredState;