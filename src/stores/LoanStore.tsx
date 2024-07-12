import { message } from "antd";
import { database } from "../firebase";

export interface LoanDTO {
    loan_mouth: number,
    loan_number: number,
}

export const getLoanDocument = async () => {
    try {
        const snapshot = await database.ref("loan").once("value");
        const dataObj = snapshot.val();
        return dataObj;
    } catch (error) {
        message.error("Lỗi khi lấy dữ liệu!");
        console.error("Error fetching data:", error);
        throw error;
    }
}

export const updateLoanDocument = async (loan_mouth: number) => {
    try {
        const snapshot = await database.ref("loan/" + loan_mouth).once("value");
        const loan = snapshot.val();
        const updatedLoanNumber: number = Number(loan) + 1;
        await database.ref("loan/" + loan_mouth).set(updatedLoanNumber);
    } catch (error) {
        message.error("Lỗi khi cập nhật dữ liệu!");
        console.error("Error updating data:", error);
        throw error;
    }
}