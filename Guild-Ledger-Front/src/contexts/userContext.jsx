import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null)

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const persistUser = (userData) => {
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData))
        } else {
            localStorage.removeItem('user')
        }
        setUser(userData)
    }
    
    return (
        <UserContext.Provider value={{ user, setUser: persistUser }}>
            {children}
        </UserContext.Provider>
    )
}