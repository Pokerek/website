import AuthService from '../services/auth-service';

const loginPageAction = async ({ request }: any) => {
    const formData = await request.formData();

    const username = formData.get('username');
    const password = formData.get('password');

    console.log(username, password);
    const response = await AuthService.login(username, password);
    console.log(response);
    return null;
}

export default loginPageAction;