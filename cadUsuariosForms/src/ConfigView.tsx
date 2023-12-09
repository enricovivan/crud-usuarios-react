import { RouterProvider } from "react-router-dom";
import MessageContext from "./hooks/MessageContext";
import { router } from "./routers/router";
import { useState } from "react";

export default function ConfigView() {

    const [globalMessage, setGlobalMessage] = useState<string>('')

    return <>
        <MessageContext.Provider value={{globalMessage, setGlobalMessage}}>
            <RouterProvider router={router}/>
        </MessageContext.Provider>
    </>
}