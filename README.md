## test task app, made by tyshchenko.s for springs

## How to use

- `GET` /posts/list/:pageNum - show post with pagination of 2 posts per page
- `POST` /posts - create new post, authorization required
  > {
  > "title" : " post title",
  > "body": "post content ",
  > "dateAdded": "manual creation date was enabled for test purposes"
  > }
- `GET` /posts/:post_id - show a single post
- `PUT` /posts/:post_id - edit post, authorization required, ownership required
  > {
  > "title" : " post title",
  > "body": "post content "
  > }
- `DELETE` posts/:post_id - delete post, authorization required, ownership required
- `GET` /posts/search/:search_text - search posts by title or content
- `POST` /user/register - create new user
  > {
  > "username" : " username",
  > "email": "username@mail.com ",
  > "password": "password"
  > }
- `POST` /user/login - log in
  > {
  > "email": "username@mail.com ",
  > "password": "password"
  > }
- `PUT` /user/:user_id:/edit - edit user info, authorization required
  > {
  > "username" : "username",
  > "email": "username@mail.com ",
  > "password": "password"
  > "phone": "123456789",
  > "linkedIn": "linkedIn link",
  > "zip_code": "12345"
  > }
- `GET`/stat - show daily post creation statistics
