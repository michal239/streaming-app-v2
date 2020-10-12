import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Stream {
  @Field()
  viewers: number;

  @Field()
  liveSince: number;

  @Field()
  streamKey: string;
}