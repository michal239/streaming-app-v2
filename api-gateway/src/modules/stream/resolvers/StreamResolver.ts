import { Resolver, Query, Arg } from 'type-graphql';
import StreamsClient from '../../../microservices/StreamsService/StreamsClient';
import { Stream } from '../entity/Stream';

@Resolver()
export class StreamResolver {
  @Query(() => Stream, { nullable: true })
  async stream (
    @Arg('streamKey') streamKey: string
  ) {
    const stream = await StreamsClient.getStream({ streamKey });
    return stream;
  }
}