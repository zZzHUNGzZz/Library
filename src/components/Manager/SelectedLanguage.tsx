import { Select } from "antd";
import { getLanguage } from "../../stores/LanguageStore"
import { useEffect, useState } from "react";

const SelectedLanguage = () => {
    const [languageOptions, setLanguageOptions] = useState([{}]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getLanguage('');
            const options = data.map(value => ({
                value: value.la_title,
                label: value.la_title
            }));
            setLanguageOptions(options);
        };
        fetchData();
    }, []);

    return (
        <Select
            style={{ width: '100%' }}
            allowClear
            options={languageOptions}
        />
    )
}

export default SelectedLanguage;