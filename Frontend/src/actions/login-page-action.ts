import { redirect } from 'react-router-dom';
import AuthService from '../services/auth-service';
import { routesPaths } from '../routes';

const loginPageAction = async ({ request }: { request: Request }) => {
    const formData = await request.formData();

    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();

    if (!username || !password) {
        return null;
    }

    try {
        await AuthService.login(username, password);
        return redirect(routesPaths.ADMIN_PAGE);
    } catch (error) {
        return error;
    }
}

export default loginPageAction;