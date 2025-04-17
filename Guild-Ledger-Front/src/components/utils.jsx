import axios from "axios";
import api from "../api";


export const Currency = (value) => {
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
        let response = api.post("/user/login/", {
            username: username,
            password: password
        })
        
            let { user, token } = (await response).data
            localStorage.setItem("token", token)
            axios.defaults.headers.common["Authorization"] = `Token ${token}`
            return user
        
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
        localStorage.removeItem("token")
        delete api.defaults.headers.common["Authorization"]
        return null
    }
    alert("Logout failed")
}
