import database from "../firebase";

export interface AuthorDTO {
    au_id: string,
    au_avatar: string | null,
    au_code: string | null,
    au_name: string | null,
    au_date: string | null,
    au_address: string | null,
    au_email: string | null,
    academic_rank: string | null,
    au_degree: string | null,
    au_pen_name: string | null,
    au_infor: string | null,
}

export const getAuthor = async (searchValue: string) => {
    try {
        const snapshot = await database.ref("author").once("value");
        const dataObj = snapshot.val();
        const dataArray: AuthorDTO[] = [];

        if (dataObj) {
            Object.keys(dataObj).forEach(key => {
                const author = dataObj[key];
                if (checkAnyField(author, searchValue)) {
                    dataArray.push({
                        au_id: key,
                        au_avatar: author.au_avatar,
                        au_code: author.au_code,
                        au_name: author.au_name,
                        au_date: author.au_date,
                        au_address: author.au_address,
                        academic_rank: author.academic_rank,
                        au_degree: author.au_degree,
                        au_email: author.au_email,
                        au_pen_name: author.au_pen_name,
                        au_infor: author.au_infor,
                    });
                }
            });
        }
        return dataArray;
    } catch (error) {
        console.error("Error fetching author data:", error);
        throw error;
    }
}

const checkAnyField = (author: AuthorDTO, searchValue: string): boolean => {
    const authorValues = Object.values(author);
    for (const value of authorValues) {
        if (value && typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
    }
    return false;
}

export const createAuthor = (data: AuthorDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    database.ref("author/").push().set(filteredData, function (error) {
        console.error("Error create author data:", error);
    });
}

export const updateAuthor = (au_id: string, data: AuthorDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    database.ref("author/" + au_id).set(filteredData, function (error) {
        console.error("Error update author data:", error);

    });
}

export const deleteAuthor = (au_id: string[]) => {
    au_id.forEach(au_id => {
        database.ref("author/" + au_id).remove(function (error) {
            console.error("Error delete author data:", error);

        });
    })
}


