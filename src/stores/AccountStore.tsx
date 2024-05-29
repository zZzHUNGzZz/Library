
import { message } from "antd";
import database from "../firebase";

export interface AccountDTO {
    ac_id: string,
    ac_user_name: string,
    ac_password: string,
    ac_role: number | null,
}

export const getAccount = async (username: string, password: string) => {
    try {
        const snapshot = await database.ref("account").once("value");
        const dataObj = snapshot.val();

        if (dataObj) {
            for (const key of Object.keys(dataObj)) {
                const account = dataObj[key];
                if (account.ac_user_name === username && account.ac_password === password) {
                    return {
                        ac_id: key,
                        ac_user_name: account.ac_user_name,
                        ac_password: account.ac_password,
                        ac_role: account.ac_role,
                    } as AccountDTO;
                }
            }
        }
        return null; 
    } catch (error) {
        message.error("Lỗi khi lấy dữ liệu!");
        console.error("Error fetching data:", error);
        throw error;
    }
}

export const createAccount = (data: AccountDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    database.ref("account/").push().set(filteredData, function (error) {
        if (error) {
            console.error("Error create data:", error);
            message.error('Lỗi khi thêm mới dữ liệu!');
        }
    });
}




