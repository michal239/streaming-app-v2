import { Resolver, Query, Arg } from 'type-graphql';
import UsersClient from '../../../microservices/UsersService/UsersClient'
import { User } from '../entity/User';

@Resolver()
export class UserResolver {
  @Query(() => User)
  async user(
    @Arg('email') email: string
  ): Promise<User | null> {
    const query = JSON.stringify({email: email});
    const user = await UsersClient.findOne({ query });
    return user;
  }
}