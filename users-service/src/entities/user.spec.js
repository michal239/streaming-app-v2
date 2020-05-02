import bcrypt from 'bcryptjs';
import makeFakeUser from '../../__test__/fixtures/user';
import makeUser from './'

describe('User entity', () => {
  it('Throws an error when username is not supplied', async () => {
    const user = makeFakeUser({ username: null });
    let error;
    try {
      await makeUser(user)
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('Invalid username'));
  });

  it('Throws an error when username is too short', async () => {
    const user = makeFakeUser({ username: 'xx' });
    let error;
    try {
      await makeUser(user)
    } catch(e) {
      error = e;
    }
    expect(error).toEqual(new Error('Invalid username'));
  });

  it('Throws an error when username is too long', async () => {
    const user = makeFakeUser({ username: 'xxxxxxxxxxxxxxxxxxxx21212' });
    let error;
    try {
      await makeUser(user)
    } catch(e) {
      error = e;
    }
    expect(error).toEqual(new Error('Invalid username'));
  });

  it('Throws an error when username contains forbbiden characters', async () => {
    const user = makeFakeUser({ username: '$&dave^^?' });
    let error;
    try {
      await makeUser(user)
    } catch(e) {
      error = e;
    }
    expect(error).toEqual(new Error('Invalid username'));
  });

  it('Throws an error when email is not supplied', async () => {
    const user = makeFakeUser({ email: null });
    let error;
    try {
      await makeUser(user)
    } catch(e) {
      error = e;
    }
    expect(error).toEqual(new Error('Invalid email'))
  });

  it('Throws an error when email does not match pattern', async () => {
    const user = makeFakeUser({ email: 'dave2000@gmailcom' });
    let error;
    try {
      await makeUser(user)
    } catch(e) {
      error = e;
    }
    expect(error).toEqual(new Error('Invalid email'))  
  });

  it('Throws an error when email does not match pattern', async () => {
    const user = makeFakeUser({ email: 'dave2000gmail.com' });
    let error;
    try {
      await makeUser(user)
    } catch(e) {
      error = e;
    }
    expect(error).toEqual(new Error('Invalid email'))  
  });

  it('Throws an error when password is not supplied', async () => {
    const user = makeFakeUser({ password: null });
    let error;
    try {
      await makeUser(user)
    } catch(e) {
      error = e;
    }
    expect(error).toEqual(new Error('Invalid password'));
  });

  it('Throws an error when password is too short', async () => {
    const user = makeFakeUser({ password: 'x23XZ' });
    let error;
    try {
      await makeUser(user)
    } catch(e) {
      error = e;
    }
    expect(error).toEqual(new Error('Invalid password'));
  })

  it('Throws an error when password is too long', async () => {
    const user = makeFakeUser({ password: 'above48charactersloXngpasswordppppppppppppppppppppppppppppppppppppppppppppppp' });
    let error;
    try {
      await makeUser(user)
    } catch(e) {
      error = e;
    }
    expect(error).toEqual(new Error('Invalid password'));
  });

  it('Does not modify data', async () => {
    const userData = { username: 'Dave', email: 'email@gmail.com', password: 'davedave21' };
    const user = await makeUser(userData)
    expect(user.getUsername()).toBe(userData.username);
    expect(user.getEmail()).toBe(userData.email);
    expect(user.getPassword()).toBe(userData.password);
  });

  it('Hashes password', async () => {
    const password = 'mypassword2000'
    const fakeUser = makeFakeUser({ password });
    const user = await makeUser(fakeUser, true);
    const isHashed = bcrypt.compareSync(password, user.getPassword());
    expect(isHashed).toBe(true);
  });
});