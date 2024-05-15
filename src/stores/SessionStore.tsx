import { message } from "antd";
import database from "../firebase";
import { MemberDTO } from "./MemberStore";

export const getMemberNameById = async (id: string) => {
    try {
        const snapshot = await database.ref(`member/${id}`).once("value");
        const member: MemberDTO | null = snapshot.val();

        if (member && member.me_name) {
            return member.me_name;
        } else {
            return '';
        }
    } catch (error) {
        message.error("Lỗi khi lấy dữ liệu!");
        console.error("Error fetching data:", error);
        throw error;
    }
}

export const getTotalDocument = async (): Promise<number> => {
    try {
        const snapshot = await database.ref("documentInfo").once("value");
        const dataObj = snapshot.val();
        let totalCount = 0;

        if (dataObj) {
            totalCount = Object.keys(dataObj).length;
        }

        return totalCount;
    } catch (error) {
        console.error("Error fetching total document count:", error);
        throw error;
    }
}