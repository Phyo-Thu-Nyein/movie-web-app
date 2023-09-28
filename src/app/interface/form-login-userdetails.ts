export interface LoginUserDetails {
    status?: string;
    token?:  string;
    data?:   Data;
}

export interface Data {
    user?: User;
}

export interface User {
    _id?:                  string;
    name?:                 string;
    email?:                string;
    password?:             string;
    role?:                 string;
    __v?:                  number;
    passwordResetExpires?: Date;
    passwordResetToken?:   string;
}
