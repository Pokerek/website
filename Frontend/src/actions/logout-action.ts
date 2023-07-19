import { redirect } from "react-router-dom";
import AuthService from "../services/auth-service";
import { routesPaths } from "../routes";

export default async function logoutAction() {
    try {
        await AuthService.logout();
        return redirect(routesPaths.HOME_PAGE);
    } catch (error) {
        return redirect(routesPaths.ADMIN_PAGE);
    }
}