import { createContext } from "react";

interface MessageType {
    globalMessage: string
    setGlobalMessage: (v: string)=>void
}

const MessageContext = createContext<MessageType>({globalMessage: '', setGlobalMessage(v) {
    v
},})

export default MessageContext