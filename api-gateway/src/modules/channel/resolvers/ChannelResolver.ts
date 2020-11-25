import { Resolver, Query, Arg } from 'type-graphql';
import { Channel } from '../entity/Channel'
import ChannelsClient from '../../../microservices/ChannelsService/ChannelsClient';

@Resolver()
export class ChannelResolver {
  @Query(() => Channel, { nullable: true })
  async channel(
    @Arg('userId') userId: string
  ): Promise<Channel | null> {
    const query = JSON.stringify({ userId });
    const channel = await ChannelsClient.findOne({ query });
    return channel;
  }
} 