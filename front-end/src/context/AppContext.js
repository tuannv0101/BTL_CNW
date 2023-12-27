import { createContext, useContext, useState } from "react";
import { message } from 'antd'
import { BACK_END_URL } from "./const";
import { Link, useHistory } from "react-router-dom";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const history = useHistory();

    const handleLogin = async (username, password) => {
        if (!username || !password) {
            message.warning("Chưa nhập đủ")
            return
        }

        try {
            const options = {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password })
            }
            const res = await fetch(`${BACK_END_URL}login`, options)
            const data = await res.json();

            if (data.data.length === 0) {
                message.warning('Không tồn tại tài khoản')
                return
            }
            setUser(data.data);
            message.success('Đăng nhập thành công')
            history.push('/nhom')
        } catch (error) {
            console.log(error.message);
            message.error(error.message)
        }
    }

    return (
        <AppContext.Provider value={
            {
                user,
                setUser,
                handleLogin
            }
        }>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
export const useData = () => {
    return useContext(AppContext);
}