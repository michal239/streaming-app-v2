import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Subscriptions {
  @Field()
  count: number;

  @Field(() => [String])
  subscribers: Array<string>;
}

@ObjectType()
export class Channel {
  @Field()
  id: string;

  @Field(() => Subscriptions)
  subscriptions: Subscriptions
  
  @Field()
  views: number;

  @Field()
  userId: string;

  @Field()
  streamKey: string;
}