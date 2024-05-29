
import { message } from "antd";
import database from "../firebase";

export interface AccountDTO {
    ac_id: string,
    ac_username: string,
    ac_password: string,
    ac_role: number | null,
    me_name: string,
    me_identify: string,
    me_birthday: string,
    me_sex: 0 | null,
    me_address: string | null,
    me_phone: string | null,
    me_email: string | null
    me_note: string | null,
    me_more_infor: string,
}

export const getAccount = async (username: string, password: string) => {
    try {
        const snapshot = await database.ref("account").once("value");
        const dataObj = snapshot.val();

        if (dataObj) {
            for (const key of Object.keys(dataObj)) {
                const account = dataObj[key];
                if (account.ac_username === username && account.ac_password === password) {
                    return {
                        ac_id: key,
                        ac_username: account.ac_username,
                        ac_password: account.ac_password,
                        ac_role: account.ac_role,
                        me_name: account.me_name,
                        me_identify: account.me_identify,
                        me_birthday: account.me_birthday,
                        me_sex: account.me_sex,
                        me_address: account.me_address,
                        me_phone: account.me_phone,
                        me_email: account.me_email,
                        me_note: account.me_note,
                        me_more_infor: account.me_more_infor,

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




