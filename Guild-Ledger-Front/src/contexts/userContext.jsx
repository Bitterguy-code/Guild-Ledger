import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'

export const UserContext = createContext(null)

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const validateUser = async () => {
            const storedUser = localStorage.getItem('user')
            if (!storedUser) return

            try {
                const decoded = jwtDecode(userData.access)
                if (decoded.exp * 1000 < Date.now()) {
                    throw new Error('Token expired')
                }

                setUser(userData)
            } catch (error) {
                localStorage.removeItem('user')
                setUser(null)
            }
            


        }

        validateUser()
    }, [])

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