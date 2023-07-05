import AuthService from '../services/auth-service';

const loginPageAction = async ({ request }: any) => {
    const formData = await request.formData();

    const username = formData.get('username');
    const password = formData.get('password');

    try {
        await AuthService.login(username, password);
    } catch (error) {
        return error;
    }
}

export default loginPageAction;