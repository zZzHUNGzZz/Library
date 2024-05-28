import React, { ReactNode, createContext, useState } from 'react'

interface IProps {
    children?: ReactNode;
}

export type RoleContextType = {
    role: number
    setRole: (role: number) => void
}

export const RoleContext = createContext<RoleContextType>({
    role: 0,
    setRole: () => { }
});

export const RoleProvider = ({ children }: IProps) => {
    const [role, setRole] = useState(0);

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    )
}