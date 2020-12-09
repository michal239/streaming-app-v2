import ChannelsClient from '../../../microservices/ChannelsService/ChannelsClient';
import { Resolver, Query, Arg, Mutation, Ctx, Authorized, FieldResolver, Root } from 'type-graphql';
import StreamsClient from '../../../microservices/StreamsService/StreamsClient';
import { Stream } from '../entity/Stream';

@Resolver(() => Stream)
export class StreamResolver {
  @Query(() => Stream, { nullable: true })
  async stream (
    @Arg('streamKey') streamKey: string
  ): Promise<Stream | null> {
    const stream = await StreamsClient.getStream({ streamKey });
    return stream;
  }

  @Query(() => [Stream])
  async streams(): Promise<Array<Stream>> {
    const streams = await StreamsClient.getStreams();
    return streams;
  }

  @FieldResolver(() => String, { nullable: true })
  async thumbnail(
    @Root() stream: Stream
  ) {
    const img = await StreamsClient.getThumbnail({ streamKey: stream.streamKey });
    return img
  }

  @Authorized()
  @Mutation(() => String, { nullable: true })
  async setStreamInfo(
    @Arg('title') title: string,
    @Arg('category') category: string,
    @Ctx() ctx: any
  ): Promise<null> {
    const query = JSON.stringify({ userId: ctx.user.id });
    const channel = await ChannelsClient.findOne({ query });
    await StreamsClient.setStreamInfo({ title, category, streamKey: channel?.streamKey });
    return null;
  }
}