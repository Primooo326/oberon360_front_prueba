import { fetchApiBase } from "../instances";

export const login = async (Login: {
    user: string;
    password: string;
}) => {
    return await fetchApiBase.post("auth/login/", Login);
}

export const changePassword = async (newPassword: string, confirmPassword: string) => {
    return await fetchApiBase.post("users/changePassword", {
        newPassword,
        confirmPassword
    })
}