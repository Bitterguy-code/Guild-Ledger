import axios from "axios";
import api from "../api";
import { Navigate } from "react-router-dom";
const navigate = Navigate


export const Currency = (value) => {
    if (!value) return { gold:0, silver:0, copper:0}
    const copper = value % 100;
    const silver = Math.floor(value / 100) % 100;
    const gold = Math.floor(value / 10000);
    return (
        {
            "gold": gold,
            "silver": silver,
            "copper": copper
        }
    )
}

export const userRegistration = async (userData) => {
    
    try {
        let response = await api.post("/user/signup/", userData ,
            {
                headers: {
                    Authorization: undefined
                },
            });
        if (response.status === 201) {
            const token = response.data.token
            axios.defaults.headers.common["Authorization"] = `Token ${token}`;
            localStorage.setItem("token", token);
            return { success: true, data: response.data}
        }
    } catch (error) {
        if (error.response) {
            const errors = error.response.data
            if (errors.username) {
                return {
                    success: false,
                    error: 'Username already exists.'
                }
            }
            if (errors.email) {
                return {
                    success: false,
                    error: 'Email already in use.'
                }
            }
            return {
                success: false,
                error: 'Invalid registration data.'
            }
        }
        return {
            success: false,
            error: 'Registration failed. Please try again.'
        }
    }
    
}

export const userLogIn = async (username, password) => {
    try {
        const response = await api.post("/user/login/", {
            username, password
        }, { withCredentials: true })
        const userData = {
            username: response.data.user,
            token: response.data.access
        }
        
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem("access_token", response.data.access)
        localStorage.setItem('refresh_token', response.data.refresh)

        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`
            
        return response.data.user
        
    } catch (error) {
        console.error("Login error:", error)
        alert(error.response?.data || "Login failed")
        return null
    }

}

export const userLogOut = async () => {
    let response = await api.post("user/logout/", null, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    })
    if (response.status === 204) {
        localStorage.removeItem("user")
        return null
    }
    alert("Logout failed")
}

export const characterList = async () => {
    let response = await api.get('character/list/',
        {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
    )

    if (response.status == 200) {
        return response
    } else {
        return [response.error, response.status]
    }
}
