# FreshField Dairy Backend API

A Node.js/Express backend API for the FreshField Dairy website with MySQL database integration.

## 🚀 Features

- **User Authentication**: Register, login, and profile management
- **JWT Token Authentication**: Secure API access with JSON Web Tokens
- **MySQL Database**: Reliable data storage with proper relationships
- **Password Hashing**: Secure password storage using bcrypt
- **CORS Support**: Cross-origin resource sharing enabled
- **RESTful API**: Clean and consistent API endpoints

## 📋 Database Schema

### Users Table
- `id` - Primary key
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `phone` - Phone number
- `address` - Full address
- `city`, `state`, `zip_code` - Location details
- `branch` - Preferred branch
- `location_lat`, `location_lng` - GPS coordinates
- `created_at`, `updated_at` - Timestamps

### Products Table
- `id` - Primary key
- `name` - Product name
- `description` - Product description
- `price` - Product price
- `category` - Product category
- `image_url` - Product image URL
- `stock_quantity` - Available stock
- `is_available` - Product availability status

### Orders Table
- `id` - Primary key
- `user_id` - Foreign key to users table
- `order_number` - Unique order number
- `total_amount` - Order total
- `status` - Order status (pending, processing, shipped, delivered, cancelled)
- `delivery_address` - Delivery address
- `delivery_instructions` - Special delivery instructions

### Order Items Table
- `id` - Primary key
- `order_id` - Foreign key to orders table
- `product_name` - Product name
- `quantity` - Quantity ordered
- `price` - Price at time of order

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
1. Start MySQL server
2. Create database and tables:
   ```bash
   mysql -u root -p < setup-database.sql
   ```
   Or run the SQL commands manually in MySQL Workbench/phpMyAdmin

### 3. Environment Configuration
Create a `.env` file in the backend directory:
```env
# Server Configuration
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=freshfield_dairy
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your-secret-key-here

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 4. Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### User Management
- `GET /api/user/profile` - Get user profile (requires token)
- `PUT /api/user/profile` - Update user profile (requires token)
- `GET /api/users` - Get all users (admin)

### Request/Response Examples

#### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zip_code": "10001",
  "branch": "Downtown"
}
```

#### Login User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile (with token)
```bash
GET /api/user/profile
Authorization: Bearer your-jwt-token-here
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Using parameterized queries
- **CORS Configuration**: Controlled cross-origin access

## 🗄️ Database Connection

The backend uses MySQL2 with connection pooling for better performance and reliability. The connection is automatically tested when the server starts.

## 📝 Error Handling

All API endpoints include proper error handling with appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## 🔧 Development

### File Structure
```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── config.env             # Environment configuration
├── setup-database.sql     # Database setup script
└── README.md              # This file
```

### Adding New Endpoints
1. Add the route in `server.js`
2. Implement proper error handling
3. Add input validation
4. Test with appropriate HTTP client

## 🚀 Deployment

### Production Considerations
1. Use environment variables for sensitive data
2. Set up proper CORS origins
3. Use HTTPS in production
4. Set up database backups
5. Configure proper logging
6. Use PM2 or similar process manager

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=freshfield_dairy
JWT_SECRET=your-production-secret-key
CORS_ORIGIN=https://yourdomain.com
```

## 📞 Support

For support or questions, please contact the development team.

---

**Made with ❤️ for FreshField Dairy** 