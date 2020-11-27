import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql';

import { User } from '../entity/User';
import { Channel } from '../../channel/entity/Channel';
import { Stream } from '../../stream/entity/Stream';
import UsersClient from '../../../microservices/UsersService/UsersClient'
import ChannelsClient from '../../../microservices/ChannelsService/ChannelsClient';
import StreamsClient from '../../../microservices/StreamsService/StreamsClient';


@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(
    @Arg('key') key: string,
    @Arg('value') value: string
  ): Promise<User | null> {
    const query = JSON.stringify({ [key]: value });
    const user = await UsersClient.findOne({ query });
    return user;
  }

  @Query(() => [User])
  async users(
    @Arg('key') key: string,
    @Arg('value') value: string
  ): Promise<Array<User>> {
    const stringifiedQuery = JSON.stringify({ [key]: value })
    const users = await UsersClient.find({query: stringifiedQuery});
    return users;
  }

  @Query(() => [User])
  async search(
    @Arg('key') key: string,
    @Arg('value') value: string
  ): Promise<Array<User>> {
    const users = await UsersClient.findRegexp({ key, value });
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

  @FieldResolver(() => Stream, { nullable: true })
  async stream(
    @Root() user: User
  ): Promise<Stream | null> {
    const query = JSON.stringify({ userId: user.id })
    const channel = await ChannelsClient.findOne({ query });
    const stream = await StreamsClient.getStream({ streamKey: channel?.streamKey });
    return stream;
  }
};