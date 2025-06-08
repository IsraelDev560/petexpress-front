'use client'

import { createContext, useState, Dispatch, SetStateAction, useContext } from "react";

type UserContextType = {
    user: any;
    setUser: Dispatch<SetStateAction<any>>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

type UserInfo = {
    username: string,
    role: string
}

import { ReactNode } from "react";

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserInfo>();

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
