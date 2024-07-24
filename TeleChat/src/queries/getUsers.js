import {gql} from "graphql-tag";

export const USERS_QUERY = gql`
query MyQuery {
  users {
    user_id
    user_name
    user_last_name
    user_last_seen
  }
}
`;