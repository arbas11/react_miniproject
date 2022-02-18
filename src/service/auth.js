import axios from "axios"
import bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid';

export const authLogin = async (req) => {
    try {
        const { username, password } = req
        const { data } = await axios.get(`http://localhost:3002/data`)
        const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
        const user = data.filter(v => v.username === username && v.hashedPassword === hashedPassword) || []
        if (user.length > 0) return { code: 200, status: "success", data, msg: "Successfully login" }
        return { code: 404, status: "not found", data: null, msg: "User not found" }
    } catch (e) {
        return { code: 400, status: "error", data: null, msg: "Service Error" }
    }
}

export const authRegister = async (req) => {
    try {
        const { username, fullname, address, phonenumber, password } = req
        const { data } = await axios.get(`http://localhost:3002/data`)
        const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
        const joindate = new Date().toLocaleDateString();
        const user = data.filter(v => v.phonenumber === phonenumber || v.username === username)
        if (user.length > 0) {
            return { code: 409, status: "conflict", msg: "User already exist" }
        } else {
            const id = uuid();
            await axios.post(`http://localhost:3002/data`, { id, username, fullname, address, phonenumber, hashedPassword, joindate });
            return { code: 200, status: "success", msg: "Sucessfully registered" }
        }
    } catch (e) {
        return { code: 400, status: "error", msg: "Service Error" }
    }
}