import { createContext } from "react";

const UserContext = createContext({
    username : "Guest",
    email : "",
    loggedIn : false
})

export default UserContext;