import { getLanguage } from "../../stores/LanguageStore";

export const SelectedLanguage = async () => {
    const language = await getLanguage('');
    return language.map(value => ({
        value: value.la_title,
        label: value.la_title
    }));
}
