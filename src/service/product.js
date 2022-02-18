import axios from "axios"

export const getProducts = async () => {
    try {
        const { data } = await axios.get(`http://localhost:3001/data`)
        return { code: 200, status: "success", products: data, msg: "get data sukses" }
    } catch (e) {
        return { code: 400, status: "error", productsdata: null, msg: "Service Error" }
    }
}

export const createProducts = async (prevData, form) => {
    try {
        prevData.rows.push(form)
        const { data } = await axios.post(`http://localhost:3001/data`, (prevData))
        return { code: 200, status: "success", products: data, msg: "Product has been added" }
    } catch (e) {
        return { code: 400, status: "error", products: null, msg: "Service Error" }
    }
}

export const updateProducts = async (prevData, form, id) => {
    try {
        prevData.rows.map((row, index) => (row.id === id ? prevData.rows[index] = form : { ...row }))
        const { data } = await axios.post(`http://localhost:3001/data`, (prevData))
        return { code: 200, status: "success", products: data, msg: "Product Edited" }
    } catch (e) {
        return { code: 400, status: "error", products: null, msg: "Service Error" }
    }
}

export const deleteProducts = async (prevData, id) => {
    try {
        const updatedRows = prevData.rows.filter(v => id !== v.id);
        prevData.rows = updatedRows
        const { data } = await axios.post(`http://localhost:3001/data`, (prevData))
        return { code: 200, status: "success", products: data, msg: "Product Deleted" }
    } catch (e) {
        return { code: 400, status: "error", products: null, msg: "Service Error" }
    }
}