import { getDocument } from "../../stores/DocumentStore";

export const SelectedDocument = async () => {
    const member = await getDocument('');
    return member.map(value => ({
        value: value.do_title,
        label: value.do_title
    }));
}