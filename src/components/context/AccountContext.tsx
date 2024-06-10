import { ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react';
import { AccountDTO } from '../../stores/AccountStore';

interface IProps {
    children?: ReactNode;
}

interface IAccountContext {
    account: AccountDTO | undefined;
    setAccount: Dispatch<SetStateAction<AccountDTO | undefined>>;
}

export const AccountContext = createContext<IAccountContext>({
    account: undefined,
    setAccount: () => {},
});

export const AccountProvider = ({ children }: IProps) => {
    const [account, setAccount] = useState<AccountDTO | undefined>(undefined);

    return (
        <AccountContext.Provider value={{ account, setAccount }}>
            {children}
        </AccountContext.Provider>
    );
};