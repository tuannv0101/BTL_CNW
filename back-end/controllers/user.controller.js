const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config()

class UserController {
    checkUser = async (req, res, next) => {
        try {
            const user = await User.findById(req.userId).select("-password")

            if (!user) return res.json({ success: false, message: "Không tìm thấy người dùng" })

            return res.json({ success: true, data: user });
        } catch (error) {
            console.error('Error checking user in: ', error);
            return res.json({ success: false, data: null, message: "Lỗi khi check người dùng" });
        }
    }

    login = async (req, res, next) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.json({ success: false, data: [], message: "Thiếu username hoặc password" });
        }

        try {
            const user = await User.findOne({ username });
            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const accessToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
                    return res.json({ success: true, data: user, accessToken });
                } else {
                    return res.json({ success: false, data: null, message: "Tên đăng nhập hoặc mật khẩu không đúng" });
                }
            } else {
                return res.json({ success: false, data: null, message: "Tên đăng nhập hoặc mật khẩu không đúng" });
            }
        } catch (error) {
            console.error('Error logging in: ', error);
            return res.json({ success: false, data: null, message: "Lỗi khi đăng nhập" });
        }
    }

    register = async (req, res, next) => {
        const { username, password, name } = req.body;
        if (!username || !password || !name) {
            return res.json({ success: false, data: [], message: "Thiếu thông tin đăng ký" });
        }

        try {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.json({ success: false, data: null, message: "Tên đăng nhập đã tồn tại" });
            }

            const role = 0 // Normal User
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                password: hashedPassword,
                name,
                role
            });
            await newUser.save();

            const accessToken = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);
            return res.json({ success: true, data: newUser, accessToken });
        } catch (error) {
            console.error('Error register in: ', error);
            return res.json({ success: false, data: null, message: "Lỗi khi đăng ký" });
        }
    }
}

module.exports = new UserController()
