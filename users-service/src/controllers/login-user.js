export default function buildLoginUser({ getUser, HashService, TokenService }) {
  return async function loginUser(httpRequest) {
    const { email, password } = httpRequest;
    try {
      if (!email || !password) throw new Error('Invalid email or password');

      const user = await getUser({ email });
      if (!user) throw new Error('Invalid email or password');

      const passwordMatch = await HashService.compare(password, user.password);
      if (!passwordMatch) throw new Error('Invalid email or password');

      const token = TokenService.sign({
        id: user._id,
        email: user.email,
        username: user.username
      });

      return {
        statusCode: 200,
        body: {
          token
        }
      }
    } catch (err) {
      return {
        statusCode: 400,
        body: {
          error: {
            message: err.message
          }
        }
      }
    }
  }
}