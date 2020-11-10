import buildAddUser from './add-user';
import UsersDb from '../../__test__/fixtures/usersDb';



describe('Add user', () => {
  it('Throws an error when email is taken', async () => {
    const usersDb = new UsersDb([
      { email: 'example@gmail.com' }
    ]);
    const addUser = buildAddUser({ usersDb });

    let error;
    try {
      await addUser({ email: 'example@gmail.com' })
    } catch(e) {
      error = e;
    }

    expect(error).toEqual(new Error('Username or email is taken'));
  })

  it('Throws an error when username is taken', async () => {
    const usersDb = new UsersDb([
      { username: 'example' }
    ]);
    const addUser = buildAddUser({ usersDb });

    let error;
    try {
      await addUser({ username: 'example' })
    } catch(e) {
      error = e;
    }

    expect(error).toEqual(new Error('Username or email is taken'));
  })
})