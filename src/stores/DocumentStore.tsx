import { message } from "antd";
import database from "../firebase";

export interface DocumentStore {
    do_id: string,
    do_title: string | null,
    author: string | null,
    do_total: string | null,
    do_date_publish: string | null,
    do_identifier: string | null,
    do_translator: string | null,
    do_publisher: string | null,
    do_language: string | null,
    do_topic: string | null,
    do_category: string | null,
}

export const getDocument = async (searchKey: keyof DocumentStore = "do_id", searchValue: string | null = null) => {
    try {
        const snapshot = await database.ref("document").once("value");
        const dataObj = snapshot.val();
        const dataArray: DocumentStore[] = [];

        if (dataObj) {
            Object.keys(dataObj).forEach(key => {
                const document = dataObj[key];
                if (searchValue === null || document[searchKey] === searchValue) {
                    dataArray.push({
                        do_id: key,
                        do_title: document.do_title,
                        author: document.author,
                        do_total: document.do_total,
                        do_date_publish: document.do_date_publish,
                        do_identifier: document.do_identifier,
                        do_translator: document.do_translator,
                        do_publisher: document.do_publisher,
                        do_language: document.do_language,
                        do_topic: document.do_topic,
                        do_category: document.do_category,
                    });
                }
            });
        }

        return dataArray;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu document:", error);
        throw error;
    }
}

export const createDocument = (data: DocumentStore) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    database.ref("document/").push().set(filteredData, function (error) {
        if (error) {
            message.error('Ghi dữ liệu bị lỗi!');
        }
        else {
            message.success("Thêm mới thành công!");
        }
    });
}

export const updateDocument = (do_id: string, data: DocumentStore) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    database.ref("document/" + do_id).set(filteredData, function (error) {
        if (error) {
            message.error('Sửa dữ liệu bị lỗi!');
        }
        else {
            message.success("Sửa dữ liệu thành công!");
        }
    });
}

export const deleteDocument = (do_id: string) => {
    database.ref("document/" + do_id).remove(function (error) {
        if (error) {
            message.error('Xóa dữ liệu bị lỗi!');
        }
        else {
            message.success("Xóa dữ liệu thành công!");
        }
    });
}


