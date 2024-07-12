import { message } from "antd";
import { database } from "../firebase";
import { memberHasCard } from "./MemberStore";

const dayjs = require('dayjs');

export interface MemberCardDTO {
    me_ca_id: string,
    me_id: string | null,
    me_ca_code: string | null,
    me_ca_identify: string | null,
    me_ca_start_valid: string | null,
    me_ca_end_valid: string | null,
    me_ca_get_card: string | null,
    me_ca_money: number | null,
}

export const getMemberCard = async (searchValue: string) => {
    try {
        const snapshot = await database.ref("memberCard").once("value");
        const dataObj = snapshot.val();
        const dataArray: MemberCardDTO[] = [];

        if (dataObj) {
            Object.keys(dataObj).forEach(key => {
                const memberCard = dataObj[key];
                if (checkAnyField(memberCard, searchValue)) {
                    dataArray.push({
                        me_ca_id: key,
                        me_id: memberCard.me_id,
                        me_ca_code: memberCard.me_ca_code,
                        me_ca_identify: memberCard.me_ca_identify,
                        me_ca_start_valid: !!memberCard.me_ca_start_valid ? dayjs(memberCard.me_ca_start_valid) : null,
                        me_ca_end_valid: !!memberCard.me_ca_end_valid ? dayjs(memberCard.me_ca_end_valid) : null,
                        me_ca_get_card: !!memberCard.me_ca_get_card ? dayjs(memberCard.me_ca_get_card) : null,
                        me_ca_money: memberCard.me_ca_money,
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

const checkAnyField = (memberCard: MemberCardDTO, searchValue: string): boolean => {
    const memberCardValues = Object.values(memberCard);
    for (const value of memberCardValues) {
        if (value && typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
    }
    return false;
}

export const createMemberCard = (data: MemberCardDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    const { me_ca_start_valid, me_ca_end_valid, me_ca_get_card, ...spreadData } = filteredData
    const newMemberCard = {
        ...spreadData,
        'me_ca_start_valid': !!me_ca_start_valid ? me_ca_start_valid.toISOString() : null,
        'me_ca_end_valid': !!me_ca_end_valid ? me_ca_end_valid.toISOString() : null,
        'me_ca_get_card': !!me_ca_get_card ? me_ca_get_card.toISOString() : null,
    };
    database.ref("memberCard/").push().set(newMemberCard, function (error) {
        if (error) {
            console.error("Error create data:", error);
            message.error('Lỗi khi thêm mới dữ liệu!');
        }
    });
    memberHasCard(data.me_id!, true)
}

export const updateMemberCard = (me_ca_id: string, data: MemberCardDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    const { me_ca_start_valid, me_ca_end_valid, me_ca_get_card, ...spreadData } = filteredData
    const newMemberCard = {
        ...spreadData,
        'me_ca_start_valid': !!me_ca_start_valid ? me_ca_start_valid.toISOString() : null,
        'me_ca_end_valid': !!me_ca_end_valid ? me_ca_end_valid.toISOString() : null,
        'me_ca_get_card': !!me_ca_get_card ? me_ca_get_card.toISOString() : null,
    };
    database.ref("memberCard/" + me_ca_id).set(newMemberCard, function (error) {
        if (error) {
            console.error("Error update data:", error);
            message.error('Lỗi khi cập nhật dữ liệu!');
        }
    });
}

export const deleteMemberCard = (data: MemberCardDTO[]) => {
    data.forEach(item => {
        database.ref("memberCard/" + item.me_ca_id).remove(function (error) {
            if (error) {
                console.error("Error delete data:", error);
                message.error('Lỗi khi xóa dữ liệu!');
            }
        });
        memberHasCard(item.me_id!, false);
    })
}


