export type UserData = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	role: string;
};

export type UserDataPublic = {
	id: UserData['id'];
	firstName: UserData['firstName'];
	lastName: UserData['lastName'];
	email: UserData['email'];
	phone: UserData['phone'];
	role: UserData['role'];
};
