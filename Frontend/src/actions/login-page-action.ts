import AuthService from '../services/auth-service';

const loginPageAction = async ({ request }: any) => {
    const formData = await request.formData();

    const username = formData.get('username');
    const password = formData.get('password');

    const response = await AuthService.login(username, password) as { token: string };
    localStorage.setItem('token', response.token);

    return null;
}

export default loginPageAction;