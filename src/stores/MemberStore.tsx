import { message } from "antd";
import { database } from "../firebase";

const dayjs = require('dayjs');

export interface MemberDTO {
    me_id: string,
    me_avatar: string | null,
    me_code: string | null,
    me_name: string | null,
    me_identify: string | null,
    me_birthday: string | null,
    me_sex: string | null,
    me_address: string | null,
    me_more_infor: string | null,
    me_phone: string | null,
    me_note: string | null,
    me_status: string | null,
    me_has_card: boolean | null,
    me_is_active: boolean | null,
    me_is_locked: boolean | null,
}

export const getMember = async (searchValue: string) => {
    try {
        const snapshot = await database.ref("member").once("value");
        const dataObj = snapshot.val();
        const dataArray: MemberDTO[] = [];

        if (dataObj) {
            Object.keys(dataObj).forEach(key => {
                const member = dataObj[key];
                if (checkAnyField(member, searchValue)) {
                    dataArray.push({
                        me_id: key,
                        me_avatar: member.me_avatar,
                        me_code: member.me_code,
                        me_name: member.me_name,
                        me_identify: member.me_identify,
                        me_birthday: !!member.me_birthday ? dayjs(member.me_birthday) : null,
                        me_sex: member.me_sex,
                        me_address: member.me_address,
                        me_more_infor: member.me_more_infor,
                        me_phone: member.me_phone,
                        me_note: member.me_note,
                        me_status: member.me_status,
                        me_has_card: member.me_has_card,
                        me_is_active: member.me_is_active,
                        me_is_locked: member.me_is_locked,
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

const checkAnyField = (member: MemberDTO, searchValue: string): boolean => {
    const memberValues = Object.values(member);
    for (const value of memberValues) {
        if (value && typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
    }
    return false;
}

export const createMember = (data: MemberDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    const { me_birthday, ...spreadData } = filteredData
    const newMember = {
        ...spreadData,
        'me_birthday': !!me_birthday ? me_birthday.toISOString() : null,
        'me_has_card': false,
    };
    database.ref("member/").push().set(newMember, function (error) {
        if (error) {
            console.error("Error create data:", error);
            message.error('Lỗi khi thêm mới dữ liệu!');
        }
    });
}

export const updateMember = (me_id: string, data: MemberDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    const { me_birthday, ...spreadData } = filteredData
    const newMember = {
        ...spreadData,
        'me_birthday': !!me_birthday ? me_birthday.toISOString() : null,
    };
    database.ref("member/" + me_id).set(newMember, function (error) {
        if (error) {
            console.error("Error update data:", error);
            message.error('Lỗi khi cập nhật dữ liệu!');
        }
    });
}

export const deleteMember = (me_id: string[]) => {
    me_id.forEach(me_id => {
        database.ref("member/" + me_id).remove(function (error) {
            if (error) {
                console.error("Error delete data:", error);
                message.error('Lỗi khi xóa dữ liệu!');
            }
        });
    })
}

export const memberHasCard = async (me_name: string, createCard: boolean) => {
    try {
        const snapshot = await database.ref("member").once("value");
        const dataObj = snapshot.val();

        if (dataObj) {
            let memberUpdated = false;

            Object.keys(dataObj).forEach(key => {
                const member = dataObj[key];
                if (member.me_name === me_name) {
                    database.ref(`member/${key}`).update({ me_has_card: createCard });
                    memberUpdated = true;
                }
            });

            if (memberUpdated) {
                message.success("Cập nhật thành công!");
            } else {
                message.warning("Không tìm thấy thành viên với tên này.");
            }
        }
    } catch (error) {
        message.error("Lỗi khi cập nhật dữ liệu!");
        console.error("Error updating data:", error);
        throw error;
    }
}



