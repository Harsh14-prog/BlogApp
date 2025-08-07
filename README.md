# 📝 BlogVerse – A Full-Stack Blogging Platform

A modern blog platform built with **React**, **Tailwind CSS**, **Hono (Edge Backend)**, **Prisma**, and **PostgreSQL**. Features full user authentication, blog creation/editing, and responsive UI.

---

## 🚀 Features

- 🔐 **JWT Authentication** (Signup / Login)
- ✍️ **Create, Read, Update Blogs**
- 📄 **Blog Details View with Author Info**
- ⏳ **Pagination with Server-Side Fetching**
- ✅ **Protected Routes**
- 💅 **Tailwind-based Dark UI**
- 🔄 **Zod Input Validation**
- ⚡ **Edge-ready Hono Backend**

---

## 🧑‍💻 Tech Stack

| Frontend        | Backend        | Database   | Auth           | ORM     |
|----------------|----------------|------------|----------------|---------|
| React + Vite   | Hono (Edge)    | PostgreSQL | JWT + bcryptjs | Prisma  |
| Tailwind CSS   | Hono Router    |            | Zod            |         |

---

## 📸 Screenshots

### 🏠 Blog List Page
![Blog List](./screenshots/blog-list.png)

### 📃 Blog Detail Page
![Blog Detail](./screenshots/blog-detail.png)

### 🔐 Auth Pages
![Auth](./screenshots/auth.png)


---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Harsh14-prog/BlogApp
cd BlogApp
```

---

### 2. 🧶 Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

---

### 3. 🔄 Prisma Migration

```bash
cd backend
npx prisma migrate dev --name init
```

---

### 4. 🔐 Environment Variables

Create a `.env` file inside the `backend/` folder with the following:

```env
DATABASE_URL=your_postgresql_connection_url
SECRET=your_jwt_secret
```

---

### 5. 🚀 Run Development Servers

```bash
# Run frontend
cd frontend
npm run dev

# Run backend
cd backend
npm run dev
```

---

## 📁 Folder Structure

```
BlogApp/
├── frontend/ # React + Tailwind frontend
│ ├── components/ # Reusable UI components
│ ├── pages/ # App pages (Home, Blog, Auth)
│ ├── hooks/ # Custom React hooks (blog, auth)
│ ├── App.tsx # Main routes
│ └── main.tsx # App entry point

├── backend/ # Hono + Prisma backend
│ ├── routes/ # Blog & user route handlers
│ ├── prisma/ # Prisma schema & migrations
│ └── index.ts # Backend app entry

├── common/ # Shared Zod validation schemas
│ └── index.ts

├── screenshots/ # Screenshots for GitHub README
├── README.md # Project overview & setup guide
└── .gitignore # Ignored files
```

---

## 📚 API Endpoints

| Method | Endpoint              | Description               |
|--------|-----------------------|---------------------------|
| POST   | `/api/v1/user/signup` | Register a user           |
| POST   | `/api/v1/user/signin` | Login & return JWT token  |
| POST   | `/api/v1/blog/`       | Create a new blog post    |
| PUT    | `/api/v1/blog/`       | Update an existing blog   |
| DELETE | `/api/v1/blog/:id`    | Delete a blog post        |
| GET    | `/api/v1/blog/bulk`   | Get paginated blog posts  |
| GET    | `/api/v1/blog/:id`    | Get a blog post by ID     |

---

## 💡 Future Improvements

- [ ] Add blog delete/edit buttons in frontend
- [ ] Add search functionality
- [ ] Add comments per blog
- [ ] User profile page with list of authored blogs
- [ ] Image upload using Cloudinary
- [ ] Dark/Light mode toggle

---

## 👤 Author

**Harshad Khambe**  
[GitHub](https://github.com/Harsh14-prog) | [LinkedIn](https://www.linkedin.com/in/harshad-khambe-33b06a255/)

---

## 📄 License

This project is licensed under the MIT License.