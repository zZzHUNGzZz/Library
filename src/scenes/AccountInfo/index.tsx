import { FaRegCircleUser } from "react-icons/fa6";
import { useContext, useState } from "react";
import { AccountContext } from "../../components/context/AccountContext";
import { Popover } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import ModalAccountInfo from "./ModalAccountInfo";

function AccountInfo() {
    const [visibleAccountInfo, setVisibleAccountInfo] = useState(false);
    const account = useContext(AccountContext);

    const content = (
        <>
            <p onClick={async () => await setVisibleAccountInfo(true)}><UserOutlined /> Thông tin tài khoản</p>
            <div className="line-space"></div>
            <p className="button-log-out" onClick={() => window.location.reload()}><LogoutOutlined /> Đăng xuất</p>
        </>
    );
    return (
        <>
            <Popover placement="bottomRight" content={content} >
                <div className='user-info'>
                    <FaRegCircleUser style={{ width: 20, height: 20, marginRight: 8 }} />
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