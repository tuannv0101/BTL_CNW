import { createContext, useContext, useState } from "react";
import { message } from 'antd'
import { BACK_END_URL } from "./const";
import { useHistory } from "react-router-dom";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [group, setGroup] = useState([])

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

    const fetchNhom = async () => {
        try {
            const res = await fetch(`${BACK_END_URL}group/${user[0].id}`)
            const data = await res.json();
            setGroup(data.data.filter(item => {
                const itemMemberIds = item.members.map(i => i.id)
                return itemMemberIds.includes(user[0].id)
            }));
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
                handleLogin,
                group,
                fetchNhom,
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