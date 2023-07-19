import { redirect } from "react-router-dom";
import AuthService from "../services/auth-service"
import { routesPaths } from "../routes";

export default async function authLoader() {
    const isSession = await AuthService.checkIsSession();
    if (!isSession) {
        return redirect(routesPaths.LOGIN_PAGE);
    }

    return {
        isSession
    };
}