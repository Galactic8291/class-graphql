// Hello Resolver
import { Arg, Query, Resolver } from 'type-graphql'

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello(
    @Arg('name', { nullable: true }) name: string
  ) {
    return `Hello ${name || 'World'}!!!`
  }
}
