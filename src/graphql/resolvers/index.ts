import { tradeResolvers } from "./trades";
import { userResolver } from "./users";

export const resolvers = [userResolver, tradeResolvers]