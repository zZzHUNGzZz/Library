
import { message } from "antd";
import { database } from "../firebase";

export interface AccountDTO {
    ac_username: string,
    ac_password: string,
    ac_role: number | null,
    me_avatar: string | null,
    me_name: string,
    me_identify: string,
    me_birthday: string,
    me_sex: 0 | null,
    me_address: string | null,
    me_phone: string | null,
    me_email: string | null
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
                        ac_username: account.ac_username,
                        ac_password: account.ac_password,
                        ac_role: account.ac_role,
                        me_avatar: account.me_avatar,
                        me_name: account.me_name,
                        me_identify: account.me_identify,
                        me_birthday: account.me_birthday,
                        me_sex: account.me_sex,
                        me_address: account.me_address,
                        me_phone: account.me_phone,
                        me_email: account.me_email,
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

export const createAccount = (data: AccountDTO, isSuccess: (isSuccess: boolean) => void) => {
    const ac_username = data.ac_username;

    database.ref(`account/${ac_username}`).once('value', (snapshot) => {
        if (snapshot.exists()) {
            message.error('Tài khoản đã tồn tại!');
            isSuccess(false);
        } else {
            const filteredData = Object.fromEntries(
                Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
            );

            database.ref(`account/${ac_username}`).set(filteredData, function (error) {
                if (error) {
                    console.error("Error create data:", error);
                    message.error('Lỗi khi thêm mới dữ liệu!');
                    isSuccess(false);
                } 
                else {
                    isSuccess(true);
                }
            });
        }
    });
};




