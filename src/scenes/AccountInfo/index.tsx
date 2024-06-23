import { FaRegCircleUser } from "react-icons/fa6";
import { useContext, useState } from "react";
import { AccountContext } from "../../components/context/AccountContext";
import { Avatar, Popover } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import ModalAccountInfo from "./ModalAccountInfo";

function AccountInfo() {
    const [visibleAccountInfo, setVisibleAccountInfo] = useState(false);
    const account = useContext(AccountContext);

    const content = (
        <>
            <p className="button-account-info" onClick={async () => await setVisibleAccountInfo(true)}><UserOutlined /> Thông tin tài khoản</p>
            <div className="line-space"></div>
            <p className="button-logout" onClick={() => window.location.reload()}><LogoutOutlined /> Đăng xuất</p>
        </>
    );

    const avatar = (
        <>
            {
                !!account.account?.me_avatar
                    ?
                    <Avatar src={account.account?.me_avatar} size={25} style={{ marginRight: 8 }} />
                    :
                    <FaRegCircleUser size={25} style={{ marginRight: 8 }} />
            }
        </>
    );

    return (
        <>
            <Popover placement="bottomRight" content={content} >
                <div className='user-info'>
                    <span>{avatar}</span>
                    <span>{account.account?.me_name}</span>
                </div>
            </Popover>

            <ModalAccountInfo
                isVisible={visibleAccountInfo}
                setVisibleAccountInfo={setVisibleAccountInfo}
            />

        </>
    );
}

export default AccountInfo;