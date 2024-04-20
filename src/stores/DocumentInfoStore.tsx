import database from "../firebase";

export const createDocumentInfo = (name: string | undefined, age: string | undefined) => {
    database.ref("documentInfo/").push().set({
        name: name,
        age: age,
    }, function (error) {
        if (error) {
            alert('Ghi dữ liệu bị lỗi!');
        }
        else {
            alert("Thêm mới thành công!");
        }
    });
}

export const updateDocumentInfo = (name: string | undefined, age: string | undefined) => {
    database.ref("documentInfo").set({
        name: name,
        age: age,
    }).catch(alert);
}

export const getDocumentInfo = () => {
    return database.ref("documentInfo").once("value")
        .then((snapshot) => {
            const dataObj = snapshot.val();
            if (dataObj) {
                const dataArray = Object.keys(dataObj).map(key => ({
                    id: key,
                    name: dataObj[key].name,
                    age: dataObj[key].age // Lấy age từ đối tượng con của mỗi document
                }));
                return dataArray;
            } else {
                return [];
            }
        })
        .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu từ Firebase:", error);
            throw error;
        });
}