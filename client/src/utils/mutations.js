import { gql } from '@apollo/client'

export const SAVE_BOOK = gql`
  mutation savedBooks($bookData:BookData!) {
    savedBooks($bookData: $BookData!) {
      _id 
      username
      email
      savedBooks{
          bookId
          authors
          description
          image
          link
          title
      }
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: bookId) {
    removeBook(bookId: $bookId!) {
      _id 
      username
      email
      savedBooks{
          bookId
          authors
          description
          image
          link
          title
      }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      _id 
      username
      email
      savedBooks{
          bookId
          authors
          description
          image
          link
          title
      }
      }
    }
  }
`;