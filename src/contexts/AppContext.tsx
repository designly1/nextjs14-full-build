import React, { createContext, useContext, useState, FunctionComponent, useEffect } from 'react';

import { UserDataPublic } from '@/types/UserData.type';
import { usePathname } from 'next/navigation';
import { getUserData } from '@/lib/client/auth';

interface AppContextProps {
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	userData: UserDataPublic | null;
	setUserData: React.Dispatch<React.SetStateAction<UserDataPublic | null>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
	children: React.ReactNode;
}

export const AppProvider: FunctionComponent<AppProviderProps> = ({ children }) => {
	const pathname = usePathname();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [userData, setUserData] = useState<UserDataPublic | null>(null);

	// Get user data on each route change
	useEffect(() => {
		const userData = getUserData();
		setUserData(userData);
	}, [pathname]);

	return (
		<AppContext.Provider
			value={{
				isLoading,
				setIsLoading,
				userData,
				setUserData,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useApp = (): AppContextProps => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useApp must be used within an AppProvider');
	}
	return context;
};
