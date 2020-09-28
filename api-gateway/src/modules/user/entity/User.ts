import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class User {
  @Field({nullable:true})
  _id: string;

  @Field()
  username: string;

  @Field()
  email: string;
}