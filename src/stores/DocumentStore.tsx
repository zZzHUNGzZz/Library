import database from "../firebase";

export const createDocument = (do_title: string | null, author: string | null, do_total: number | null,
    do_date_publish: string | null, do_identifier: string | null, do_translator: string | null, do_publisher: string | null,
    do_language: string | null, do_topic: string | null, do_category: string | null) => {
    database.ref("document/").push().set({
        do_title: do_title,
        author: author,
        do_total: do_total,
        do_date_publish: do_date_publish,
        do_identifier: do_identifier,
        do_translator: do_translator,
        do_publisher: do_publisher,
        do_language: do_language,
        do_topic: do_topic,
        do_category: do_category,
    }, function (error) {
        if (error) {
            alert('Ghi dữ liệu bị lỗi!');
        }
        else {
            alert("Thêm mới thành công!");
        }
    });
}

export const getDocument = () => {
    return database.ref("document").once("value")
        .then((snapshot) => {
            const dataObj = snapshot.val();
            if (dataObj) {
                const dataArray = Object.keys(dataObj).map(key => ({
                    do_id: key,
                    do_title: dataObj[key].do_title,
                    author: dataObj[key].author,
                    do_total: dataObj[key].do_total,
                    do_date_publish: dataObj[key].do_date_publish,
                    do_identifier: dataObj[key].do_identifier,
                    do_translator: dataObj[key].do_translator,
                    do_publisher: dataObj[key].do_publisher,
                    do_language: dataObj[key].do_language,
                    do_topic: dataObj[key].do_topic,
                    do_category: dataObj[key].do_category,
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