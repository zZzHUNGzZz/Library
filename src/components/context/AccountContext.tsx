// import { ReactNode, createContext, useState } from 'react'
import { ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react';
import { AccountDTO } from '../../stores/AccountStore';

interface IProps {
    children?: ReactNode;
}


interface IAccountContext {
    account: AccountDTO | null;
    setAccount: Dispatch<SetStateAction<AccountDTO | null>>;
}


export const AccountContext = createContext<IAccountContext>({
    account: null,
    setAccount: () => {},
});

export const AccountProvider = ({ children }: IProps) => {
    const [account, setAccount] = useState<AccountDTO | null>(null);

    return (
        <AccountContext.Provider value={{ account, setAccount }}>
            {children}
        </AccountContext.Provider>
    );
};