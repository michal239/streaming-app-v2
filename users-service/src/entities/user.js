export default function buildMakeUser({ makeHash }) {
  return async function makeUser({
    username,
    email,
    password
  } = {}, isHashRequired = false) {
    
    const usernameRegex = new RegExp(/^[a-z0-9_-]{3,24}$/i)
    const emailRegex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
    const passwordRegex = new RegExp(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,24}$/);

    if(!username) throw new Error('Invalid username');
    if(!usernameRegex.test(username)) throw new Error('Invalid username');

    if(!email) throw new Error('Invalid email');
    if(!emailRegex.test(email)) throw new Error('Invalid email');

    if(!password) throw new Error('Invalid password');
    if(!passwordRegex.test(password)) throw new Error('Invalid password');

    if(isHashRequired) password = await makeHash(password);

    return Object.freeze({
      getUsername: () => username,
      getEmail: () => email,
      getPassword: () => password
    })
  }
}