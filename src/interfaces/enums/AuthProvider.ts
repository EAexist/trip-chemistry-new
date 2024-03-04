import { enumFromList } from "../../utils/utils";

const AuthProviderList = [
    "GUEST",
    "KAKAO",
];
export const AuthProvider = enumFromList(AuthProviderList);
export type IAuthProvider = typeof AuthProvider[keyof typeof AuthProvider]; 