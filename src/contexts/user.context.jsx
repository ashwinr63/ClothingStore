import { createContext, useState, useEffect } from "react";

import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
// actual value to access 
export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
})

export const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null)

    const value = { currentUser, setCurrentUser }

    useEffect(() => {
        const unsubscrube = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })
        return unsubscrube
    }, [])

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}
