import { message } from "antd";
import database from "../firebase";

export interface LanguageDTO {
    la_id: string,
    la_title: string | null,
    la_flag: string | null,
}

export const getLanguage = async (searchValue: string) => {
    try {
        const snapshot = await database.ref("language").once("value");
        const dataObj = snapshot.val();
        const dataArray: LanguageDTO[] = [];

        if (dataObj) {
            Object.keys(dataObj).forEach(key => {
                const language = dataObj[key];
                if (checkAnyField(language, searchValue)) {
                    dataArray.push({
                        la_id: key,
                        la_title: language.la_title,
                        la_flag: language.la_flag,
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

const checkAnyField = (language: LanguageDTO, searchValue: string): boolean => {
    const languageValues = Object.values(language);
    for (const value of languageValues) {
        if (value && typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
    }
    return false;
}

export const createLanguage = (data: LanguageDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    database.ref("language/").push().set(filteredData, function (error) {
        if (error) {
            console.error("Error create data:", error);
            message.error('Lỗi khi thêm mới dữ liệu!');
        }
    });
}

export const updateLanguage = (la_id: string, data: LanguageDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    database.ref("language/" + la_id).set(filteredData, function (error) {
        if (error) {
            console.error("Error update data:", error);
            message.error('Lỗi khi cập nhật dữ liệu!');
        }
    });
}

export const deleteLanguage = (la_id: string[]) => {
    la_id.forEach(la_id => {
        database.ref("language/" + la_id).remove(function (error) {
            if (error) {
                console.error("Error delete data:", error);
                message.error('Lỗi khi xóa dữ liệu!');
            }
        });
    })
}


