<div align="center">

# 🛒 E-Commerce API

<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
<img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT" />

**A complete Node.js/TypeScript REST API for e-commerce applications with authentication, role-based access control, and comprehensive CRUD operations.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/ornella-beza/API-ECOMMERCE.svg)](https://github.com/ornella-beza/API-ECOMMERCE/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ornella-beza/API-ECOMMERCE.svg)](https://github.com/ornella-beza/API-ECOMMERCE/network)

</div>

---

## 👩‍💻 Author

<div align="center">

**SIMBI BEZA Ornella**

[![Email](https://img.shields.io/badge/Email-ornellasimbibeza@gmail.com-red?style=flat-square&logo=gmail&logoColor=white)](mailto:ornellasimbibeza@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-ornella--beza-black?style=flat-square&logo=github&logoColor=white)](https://github.com/ornella-beza/API-ECOMMERCE.git)

</div>

---

## ✨ Features

<div align="center">

| Feature | Description |
|---------|-------------|
| 🔐 **JWT Authentication** | Secure user authentication with token-based system |
| 👥 **Role-Based Access Control** | Admin, Vendor, and Customer roles |
| 📦 **Product Management** | Full CRUD operations with advanced filtering |
| 🛒 **Shopping Cart** | Complete cart management system |
| 📂 **Category Management** | Organize products by categories |
| 👤 **User Management** | Admin user management capabilities |
| 📧 **Email Notifications** | Password reset and welcome emails |
| 📖 **API Documentation** | Complete Swagger/OpenAPI documentation |
| 🔍 **Advanced Search** | Text search and filtering capabilities |
| 📊 **Analytics** | Product statistics and reporting |

</div>

---

## 🛠️ Tech Stack

<div align="center">

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)

### Database
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

### Authentication & Security
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![bcrypt](https://img.shields.io/badge/bcrypt-3178C6?style=for-the-badge&logo=security&logoColor=white)

### Documentation & Testing
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

### Development Tools
![Nodemailer](https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge&logo=nodemailer&logoColor=white)
![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)

</div>

---

## API Endpoints

<details>
<summary><b>Authentication (6 endpoints)</b></summary>

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/auth/register` | User registration | Public |
| `POST` | `/api/auth/login` | User login | Public |
| `POST` | `/api/auth/forgot-password` | Request password reset | Public |
| `PATCH` | `/api/auth/reset-password/:token` | Reset password | Public |
| `PATCH` | `/api/auth/change-password` | Change password | Authenticated |
| `GET` | `/api/auth/profile` | Get user profile | Authenticated |

</details>

<details>
<summary><b>📂 Categories (5 endpoints)</b></summary>

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/api/categories` | Get all categories | Public |
| `GET` | `/api/categories/:id` | Get category by ID | Public |
| `POST` | `/api/categories` | Create category | Admin |
| `PUT` | `/api/categories/:id` | Update category | Admin |
| `DELETE` | `/api/categories/:id` | Delete category | Admin |

</details>

<details>
<summary><b>Products (8 endpoints)</b></summary>

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/api/products` | Get all products with pagination/filtering | Public |
| `GET` | `/api/products/stats` | Get product statistics | Public |
| `GET` | `/api/products/top` | Get top 10 most expensive products | Public |
| `GET` | `/api/products/low-stock` | Get low stock products | Public |
| `GET` | `/api/products/:id` | Get product by ID | Public |
| `POST` | `/api/products` | Create product | Vendor/Admin |
| `PUT` | `/api/products/:id` | Update product | Owner/Admin |
| `DELETE` | `/api/products/:id` | Delete product | Owner/Admin |

</details>

<details>
<summary><b> Users (5 endpoints)</b></summary>

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/api/users` | Get all users | Admin |
| `GET` | `/api/users/:id` | Get user by ID | Admin |
| `POST` | `/api/users` | Create user | Admin |
| `PUT` | `/api/users/:id` | Update user | Admin |
| `DELETE` | `/api/users/:id` | Delete user | Admin |

</details>

<details>
<summary><b>🛒 Cart (5 endpoints)</b></summary>

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/api/cart/:userId` | Get cart by user ID | Authenticated |
| `POST` | `/api/cart/:userId/items` | Add item to cart | Authenticated |
| `PUT` | `/api/cart/:userId/items/:id` | Update cart item | Authenticated |
| `DELETE` | `/api/cart/:userId/items/:id` | Remove item from cart | Authenticated |
| `DELETE` | `/api/cart/:userId` | Delete entire cart | Authenticated |

</details>

---

##  Installation

### Prerequisites
- ![Node.js](https://img.shields.io/badge/Node.js-v18+-43853D?style=flat&logo=node.js&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-v5+-4EA94B?style=flat&logo=mongodb&logoColor=white)
- ![npm](https://img.shields.io/badge/npm-v8+-CB3837?style=flat&logo=npm&logoColor=white)

### Setup Steps

```bash
# 1️⃣ Clone the repository
git clone https://github.com/ornella-beza/API-ECOMMERCE.git
cd API-ECOMMERCE

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create environment file
cp .env.example .env

# 4️⃣ Start MongoDB service
# Make sure MongoDB is running on your system

# 5️⃣ Run the application
npm run dev
```

### 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

---

##  Usage

###  API Documentation
Access the interactive Swagger documentation:
```
http://localhost:3000/api-docs
```

###  Postman Collection
Import `API-ECOMMERCE.postman_collection.json` into Postman for easy testing.

###  Authentication Flow
1. **Register** a new user or **login** with existing credentials
2. Use the returned **JWT token** in Authorization header: `Bearer <token>`
3. Access protected endpoints based on your **role**

###  Role Permissions

| Role | Permissions |
|------|-------------|
| ** Admin** | Full access to all endpoints |
| ** Vendor** | Manage own products, access cart and profile |
| ** Customer** | View products, manage cart and profile |

---

##  Project Structure

```
 API-ECOMMERCE
├── 📂 src/
│   ├── 📂 config/
│   │   ├── 🗄️ database.ts
│   │   ├── ⚙️ env.ts
│   │   └── 📖 swagger.ts
│   ├── 📂 controllers/
│   │   ├── 🔐 auth.controller.ts
│   │   ├── 📂 category.controller.ts
│   │   ├── 📦 product.controller.ts
│   │   ├── 👤 user.controller.ts
│   │   └── 🛒 cart.controller.ts
│   ├── 📂 middlewares/
│   │   └── 🛡️ auth.middleware.ts
│   ├── 📂 models/
│   │   ├── 👤 user.model.ts
│   │   ├── 📂 category.model.ts
│   │   ├── 📦 product.model.ts
│   │   └── 🛒 cart.models.ts
│   ├── 📂 routes/
│   │   ├── 🔐 auth.routes.ts
│   │   ├── 📂 category.routes.ts
│   │   ├── 📦 product.routes.ts
│   │   ├── 👤 user.routes.ts
│   │   ├── 🛒 cart.routes.ts
│   │   └── 📋 index.ts
│   ├── 📂 utils/
│   │   └── 📧 email.ts
│   └── 🚀 app.ts
├── 📄 package.json
├── 📄 README.md
├── 📄 LICENSE
└── 📄 .env
```

---

## 🎯 Scripts

```bash
npm run dev      # 🔥 Start development server with hot reload
npm start        # 🚀 Start production server
npm run build    # 🏗️ Build TypeScript to JavaScript
```

---

## 🤝 Contributing

<div align="center">

We welcome contributions! Here's how you can help:

[![Fork](https://img.shields.io/badge/Fork-Repository-blue?style=for-the-badge&logo=github)](https://github.com/ornella-beza/API-ECOMMERCE/fork)

</div>

1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. Open a **Pull Request**

---

## 📄 License

<div align="center">

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## 📞 Contact

<div align="center">

**SIMBI BEZA Ornella**

[![Email](https://img.shields.io/badge/📧_Email-ornellasimbibeza@gmail.com-red?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ornellasimbibeza@gmail.com)
[![GitHub](https://img.shields.io/badge/🐙_GitHub-ornella--beza-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ornella-beza/API-ECOMMERCE.git)

---

### ⭐ If you found this project helpful, please give it a star!

[![GitHub stars](https://img.shields.io/github/stars/ornella-beza/API-ECOMMERCE.svg?style=social&label=Star)](https://github.com/ornella-beza/API-ECOMMERCE/stargazers)

</div>