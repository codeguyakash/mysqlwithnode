Below is a sample API documentation README for your project:

---

# Blog API

This API provides endpoints to manage blogs, including creating, reading, updating, and deleting blogs.

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```
PORT=<port-number>
DB_HOST=<database-host>
DB_USER=<database-username>
DB_PASSWORD=<database-password>
DB_DATABASE=<database-name>
DB_PORT=<database-port>
```

Replace `<port-number>`, `<database-host>`, `<database-username>`, `<database-password>`, `<database-name>`, and `<database-port>` with your actual values.

4. Start the server:

```bash
npm start
```

## Endpoints

### Get All Blogs

```http
GET /blogs
```

Response:

```json
[
  {
    "id": 1,
    "title": "Blog Title",
    "description": "Blog Description",
    "author": "Author Name",
    "category": "Blog Category"
  },
  {
    "id": 2,
    "title": "Another Blog Title",
    "description": "Another Blog Description",
    "author": "Another Author",
    "category": "Another Category"
  }
]
```

### Get Blog by ID

```http
GET /blog/:id
```

Response:

```json
{
  "id": 1,
  "title": "Blog Title",
  "description": "Blog Description",
  "author": "Author Name",
  "category": "Blog Category"
}
```

### Create Blog

```http
POST /blog/create
```

Request Body:

```json
{
  "title": "New Blog Title",
  "description": "New Blog Description",
  "author": "New Author",
  "category": "New Category"
}
```

Response:

```json
{
  "message": "Blog Created",
  "createdBlogId": 3
}
```

### Update Blog

```http
PUT /blog/:id
```

Request Body:

```json
{
  "title": "Updated Blog Title",
  "description": "Updated Blog Description",
  "author": "Updated Author",
  "category": "Updated Category"
}
```

Response:

```json
{
  "message": "Updated Success",
  "updatedBlogId": 1
}
```

### Delete Blog

```http
DELETE /blog/:id
```

Response:

```json
{
  "message": "Delete Success",
  "deletedBlogId": 1
}
```

## Error Handling

- If a blog with the specified ID is not found, the server responds with a 404 status code and a message indicating "No Blog Found".
- For other errors, the server responds with a 500 status code and a generic error message.

---

You can further expand this documentation with additional details such as request/response headers, query parameters, authentication requirements, and usage examples.