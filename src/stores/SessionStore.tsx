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