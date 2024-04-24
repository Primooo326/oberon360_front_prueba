import { create } from "zustand"
import type { UserInfo } from "@/models/i+c/UserInfo"
import Cookies from 'js-cookie';

interface AuthState {
    token: string
    scope: string
    userInfo: UserInfo | null
    setAuthToken: (token: string) => void
    setScope: (scope: string) => void
    setUserInfo: (userInfo: UserInfo) => void
    logoutApp: () => void
}

export const useICAuthStore = create<AuthState>((set) => ({
    token: "",
    scope: "",
    userInfo: null,
    setAuthToken: (token) => {
        Cookies.set("token", token)
        return set({ token })
    },
    setScope: (scope) => {
        Cookies.set("scope", scope)
        return set({ scope })
    },
    setUserInfo: (userInfo) => {
        Cookies.set("userInfo", JSON.stringify(userInfo))
        return set({ userInfo })
    },
    logoutApp: () => {
        Cookies.remove("token")
        Cookies.remove("scope")
        Cookies.remove("userInfo")
        Cookies.remove('permissions')
        return set({ token: "", scope: "", userInfo: null })
    }
}))