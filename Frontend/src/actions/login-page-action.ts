import { redirect } from 'react-router-dom';
import AuthService from '../services/auth-service';
import ROUTES from '../constants/routes';

const loginPageAction = async ({ request }: any) => {
    const formData = await request.formData();

    const username = formData.get('username');
    const password = formData.get('password');

    try {
        const response = await AuthService.login(username, password) as { token: string };
        localStorage.setItem('token', response.token);

    } catch (error) {
        return error;
    }

    return redirect(ROUTES.JOURNAL_PAGE.PATH);
}

export default loginPageAction;