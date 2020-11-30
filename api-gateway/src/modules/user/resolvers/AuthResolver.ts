import { Resolver, Mutation, Arg, Ctx, Query, Authorized } from 'type-graphql';

import { User } from '../entity/User';
import UsersClient from '../../../microservices/UsersService/UsersClient';
import ChannelsClient from '../../../microservices/ChannelsService/ChannelsClient';

@Resolver()
export class AuthResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(
    @Ctx() ctx: any
  ): Promise<User | null> {
    if (!ctx.user) return null;
    const id = ctx.user.id;
    const query = JSON.stringify({ _id: id });
    const user = await UsersClient.findOne({ query });
    return user;
  }

  @Mutation(() => String, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: any
  ): Promise<void> {
    const token = await UsersClient.login({ email, password });
    ctx.res.cookie('token', token, {
      //expires after 3 weeks
      expires: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      httpOnly: true
    })
  }

  @Mutation(() => User)
  async register(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const user = await UsersClient.register({ username, email, password });
    await ChannelsClient.createChannel({ userId: user.id });
    return user;
  }

  @Mutation(() => String, { nullable: true })
  async logout(
    @Ctx() ctx: any
  ): Promise<void> {
    ctx.res.clearCookie('token');
  }
}