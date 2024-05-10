import { message } from "antd";
import database from "../firebase";

export interface PunishDTO {
    pun_id: string,
    us_id_borrow: string | null,
    us_id_create: string | null,
    pun_reason: string | null,
    pun_error: string | null,
    pun_money: string | null,
    pun_created_at: string | null,
}

export const getPunish = async (searchValue: string) => {
    try {
        const snapshot = await database.ref("punish").once("value");
        const dataObj = snapshot.val();
        const dataArray: PunishDTO[] = [];

        if (dataObj) {
            Object.keys(dataObj).forEach(key => {
                const punish = dataObj[key];
                if (checkAnyField(punish, searchValue)) {
                    dataArray.push({
                        pun_id: key,
                        us_id_borrow: punish.us_id_borrow,
                        us_id_create: punish.us_id_create,
                        pun_reason: punish.pun_reason,
                        pun_error: punish.pun_error,
                        pun_money: punish.pun_money,
                        pun_created_at: punish.pun_created_at,

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

const checkAnyField = (punish: PunishDTO, searchValue: string): boolean => {
    const punishValues = Object.values(punish);
    for (const value of punishValues) {
        if (value && typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
    }
    return false;
}

export const createPunish = (data: PunishDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    database.ref("punish/").push().set(filteredData, function (error) {
        if (error) {
            console.error("Error create data:", error);
            message.error('Lỗi khi thêm mới dữ liệu!');
        }
    });
}



