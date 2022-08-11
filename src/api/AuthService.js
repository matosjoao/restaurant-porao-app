import Http from '../common/services/Http';

export async function login(email, password) {
  return await Http.post('login', {
    email: email,
    password: password,
    device_name: 'teste',
  });
}

export async function logout() {
  return await Http.post('logout');
}
