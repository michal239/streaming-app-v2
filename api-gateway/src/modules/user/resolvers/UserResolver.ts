import { Resolver, Query, Arg, Mutation, FieldResolver, Root } from 'type-graphql';
import UsersClient from '../../../microservices/UsersService/UsersClient'
import { User } from '../entity/User';
import { Channel } from '../../channel/entity/Channel';
import ChannelsClient from '../../../microservices/ChannelsService/ChannelsClient';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(
    @Arg('email') email: string
  ): Promise<User | null> {
    const query = JSON.stringify({email: email});
    const user = await UsersClient.findOne({ query });
    return user;
  }

  @Query(() => [User])
  async users(
    @Arg('query') query: string
  ): Promise<Array<User>> {
    const stringifiedQuery = JSON.stringify({ gender: query })
    const users = await UsersClient.find({query: stringifiedQuery});
    return users;
  }

  @FieldResolver(() => Channel, { nullable: true })
  async channel(
    @Root() user: User
  ): Promise<Channel | null> {
    const query = JSON.stringify({ userId: user.id })
    const channel = await ChannelsClient.findOne({ query });
    return channel;
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