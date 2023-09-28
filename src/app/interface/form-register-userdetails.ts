export interface RegisterUserDetails {
    status?: string;
    token?:  string;
    data?:   Data;
}

export interface Data {
    user?: User;
}

export interface User {
    name?:     string;
    email?:    string;
    password?: string;
    role?:     string;
    _id?:      string;
    __v?:      number;
}
