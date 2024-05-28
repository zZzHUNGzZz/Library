
import { message } from "antd";
import database from "../firebase";

export interface AccountDTO {
    ac_id: string,
    ac_user_name: string | null,
    ac_password: string | null,
    ac_role: number,
}

export const getAccount = async (searchValue: string) => {
    try {
        const snapshot = await database.ref("account").once("value");
        const dataObj = snapshot.val();
        const dataArray: AccountDTO[] = [];

        if (dataObj) {
            Object.keys(dataObj).forEach(key => {
                const account = dataObj[key];
                if (checkAnyField(account, searchValue)) {
                    dataArray.push({
                        ac_id: key,
                        ac_user_name: account.ac_user_name,
                        ac_password: account.ac_password,
                        ac_role: account.ac_role,
                    });
                }
            });
        }
        return dataArray;
    } catch (error) {
        message.error("Lỗi khi lấy dữ liệu!");
        console.error("Error fetching data:", error);
        throw error;
    }
}

const checkAnyField = (account: AccountDTO, searchValue: string): boolean => {
    const accountValues = Object.values(account);
    for (const value of accountValues) {
        if (value && typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
    }
    return false;
}

export const createAuthor = (data: AccountDTO) => {
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




