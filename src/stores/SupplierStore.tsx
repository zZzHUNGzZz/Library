import { message } from "antd";
import { database } from "../firebase";

export interface SupplierDTO {
    su_id: string,
    su_tax_code: string | null,
    su_short_name: string | null,
    su_name: string | null,
    su_contact_name: string | null,
    su_contact_address: string | null,
    su_contact_phone: string | null,
    su_contact_fax: string | null,
    su_contact_email: string | null,
    su_contact_note: string | null,
}

export const getSupplier = async (searchValue: string) => {
    try {
        const snapshot = await database.ref("supplier").once("value");
        const dataObj = snapshot.val();
        const dataArray: SupplierDTO[] = [];

        if (dataObj) {
            Object.keys(dataObj).forEach(key => {
                const supplier = dataObj[key];
                if (checkAnyField(supplier, searchValue)) {
                    dataArray.push({
                        su_id: key,
                        su_tax_code: supplier.su_tax_code,
                        su_short_name: supplier.su_short_name,
                        su_name: supplier.su_name,
                        su_contact_name: supplier.su_contact_name,
                        su_contact_address: supplier.su_contact_address,
                        su_contact_phone: supplier.su_contact_phone,
                        su_contact_fax: supplier.su_contact_fax,
                        su_contact_email: supplier.su_contact_email,
                        su_contact_note: supplier.su_contact_note,
                    });
                }
            });
        }
        return dataArray;
    } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Lỗi khi lấy dữ liệu!");
        throw error;
    }
}

const checkAnyField = (supplier: SupplierDTO, searchValue: string): boolean => {
    const supplierValues = Object.values(supplier);
    for (const value of supplierValues) {
        if (value && typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
    }
    return false;
}

export const createSupplier = (data: SupplierDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    database.ref("supplier/").push().set(filteredData, function (error) {
        if (error) {
            message.error('Lỗi khi thêm mới dữ liệu!');
            console.error("Error create data:", error);
        }
    });
}

export const updateSupplier = (su_id: string, data: SupplierDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    database.ref("supplier/" + su_id).set(filteredData, function (error) {
        if (error) {
            message.error('Lỗi khi cập nhật dữ liệu!');
            console.error("Error update data:", error);
        }
    });
}

export const deleteSupplier = (su_id: string[]) => {
    su_id.forEach(su_id => {
        database.ref("supplier/" + su_id).remove(function (error) {
            if (error) {
                message.error('Lỗi khi xóa dữ liệu!');
                console.error("Error delete data:", error);
            }
        });
    })
}


