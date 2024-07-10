import { getMember } from "../../stores/MemberStore";

export const SelectedMember = async () => {
    const member = await getMember('');
    return member.map(value => ({
        value: value.me_name,
        label: value.me_name
    }));
}