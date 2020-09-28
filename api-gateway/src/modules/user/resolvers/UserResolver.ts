import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import UsersClient from '../../../microservices/UsersService/UsersClient'
import { User } from '../entity/User';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(
    @Arg('email') email: string
  ): Promise<User | null> {
    const query = JSON.stringify({email: email});
    const user = await UsersClient.findOne({ query });
    return user;
  }

  @Mutation(() => String)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<string> {
    const token = await UsersClient.login({ email, password });
    return token;
  }

  @Mutation(() => User)
  async register(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const user = await UsersClient.register({ username, email, password });
    return user;
  }
};