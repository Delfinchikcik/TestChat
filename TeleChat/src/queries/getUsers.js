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

export const GETUSER_BY_ID = gql`
query MyQuery($user_id: String!) {
  chats(where: {_or: [{user1_id: {_eq: $user_id}}, {user2_id: {_eq: $user_id}}]}) {
    user1_id
    user2_id
    id
    user {
      user_id
      user_name
      user_last_name
      user_last_seen
      email
    }
    userByUser2Id {
      email
      user_id
      user_last_name
      user_last_seen
      user_name
    }
  }
  message {
    message
    sender_id
    id
    chat_id
  }
}
`
export const GETMASSAGE_BY_CHAT_ID = gql`
query MyQuery($chat_id: uuid!) {
  message(where: {chat_id: {_eq: $chat_id}}) {
    chat_id
    id
    message
    sender_id
    created_at
  }
}
`