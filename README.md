# Study Material API

Backend REST API for managing study materials uploaded by teachers.
This API supports uploading, listing, downloading, and deleting study materials.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Multer
- Postman

---

## Features

- Upload study material (PDF/DOCX/PPTX)
- Store metadata in MongoDB
- List materials with filters
- Download material files
- Delete materials (file + DB cleanup)
- File type & size validation

---

## Project Structure

config/
controllers/
models/
routes/
middlewares/
uploads/
app.js

---

## API Endpoints

### Upload Material

**POST** `/api/materials`

Form-data:

- file (File)
- title (String)
- description (String)
- subject (String)
- class (String)
- type (Notes | Assignment | Exam | Other)
- tags (comma separated)

---

### Get All Materials

**GET** `/api/materials`

Optional query params:

- subject
- class
- type

---

### Get Single Material

**GET** `/api/materials/:id`

---

### Download Material

**GET** `/api/materials/:id/download`

---

### Delete Material

**DELETE** `/api/materials/:id`

---

## How to Run

**Environment Setup**
Create a .env file in the root directory and add the following environment variables:

`PORT=5000`
`MONGO_URI=mongodb://127.0.0.1:27017/study_material_db`


```bash
npm install
npm run dev
```
