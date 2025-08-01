# FreshField Dairy - Full Stack Integration Guide

This guide will help you set up the complete FreshField Dairy application with frontend, backend, and MySQL database.

## 🏗️ Project Structure

```
FreshField/FreshField/
├── src/                    # React Frontend
│   ├── components/         # React components
│   ├── context/           # React context (AuthContext, CartContext)
│   ├── services/          # API service layer
│   └── ...
├── backend/               # Node.js Backend
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   ├── config.env         # Environment configuration
│   ├── setup-database.sql # Database setup script
│   └── test-api.js        # API testing script
└── public/                # Static assets
```

## 🚀 Quick Start Guide

### Step 1: Install MySQL Database

#### Option A: MySQL Installer (Recommended)
1. Download MySQL Installer from: https://dev.mysql.com/downloads/installer/
2. Run the installer and choose "Developer Default"
3. Set a root password (remember this!)
4. Complete the installation

#### Option B: XAMPP (Alternative)
1. Download XAMPP from: https://www.apachefriends.org/
2. Install and start Apache + MySQL services
3. Access phpMyAdmin at: http://localhost/phpmyadmin

### Step 2: Set Up Database

#### Using MySQL Command Line:
```bash
# Navigate to MySQL bin directory
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"

# Connect to MySQL
mysql -u root -p

# Run the setup script
source C:\path\to\your\project\backend\setup-database.sql
```

#### Using phpMyAdmin (XAMPP):
1. Open http://localhost/phpmyadmin
2. Click "New" → Create database named `freshfield_dairy`
3. Click "SQL" tab
4. Copy and paste contents of `backend/setup-database.sql`
5. Click "Go" to execute

### Step 3: Configure Backend

1. **Update database credentials** in `backend/config.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=freshfield_dairy
DB_PORT=3306
```

2. **Start the backend server**:
```bash
cd backend
npm install
npm start
```

3. **Test the backend**:
```bash
node test-api.js
```

You should see: "✅ Database connected successfully!"

### Step 4: Start Frontend

1. **Open a new terminal** and navigate to the React app:
```bash
cd FreshField/FreshField
npm start
```

2. **The frontend will run on**: http://localhost:3000

## 🔧 Integration Features

### ✅ What's Been Integrated:

1. **Authentication System**:
   - User registration with backend API
   - User login with JWT tokens
   - Secure password hashing
   - Token-based authentication

2. **API Service Layer**:
   - Centralized API calls in `src/services/api.js`
   - Automatic token management
   - Error handling and validation

3. **Updated Components**:
   - `LoginPage.js` - Now uses real API authentication
   - `SignUpPage.js` - Now registers users in database
   - `AuthContext.js` - Integrated with backend API

4. **Database Schema**:
   - Users table with all necessary fields
   - Products table for dairy products
   - Orders and order_items tables
   - Proper relationships and indexes

### 🔄 API Endpoints Available:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user profile (requires token)
- `PUT /api/user/profile` - Update user profile (requires token)
- `GET /api/users` - Get all users (admin)

## 🧪 Testing the Integration

### Test Backend API:
```bash
cd backend
node test-api.js
```

### Test Frontend Integration:
1. Open http://localhost:3000
2. Click "Sign Up" to create a new account
3. Try logging in with the created account
4. Check that user data is stored in MySQL database

### Database Verification:
```sql
-- Connect to MySQL and run:
USE freshfield_dairy;
SELECT * FROM users;
SELECT * FROM products;
```

## 🐛 Troubleshooting

### Common Issues:

1. **Database Connection Failed**:
   - Check MySQL service is running
   - Verify credentials in `config.env`
   - Ensure database `freshfield_dairy` exists

2. **Frontend Can't Connect to Backend**:
   - Ensure backend is running on port 5000
   - Check CORS settings in backend
   - Verify API_BASE_URL in `src/services/api.js`

3. **Authentication Issues**:
   - Clear browser localStorage
   - Check JWT token expiration
   - Verify API endpoints are working

4. **Port Conflicts**:
   - Backend: Change PORT in `config.env`
   - Frontend: Change port in package.json scripts

### Debug Commands:

```bash
# Check if MySQL is running
net start | findstr MySQL

# Check if ports are in use
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Test database connection
mysql -u root -p -e "USE freshfield_dairy; SHOW TABLES;"
```

## 📝 Next Steps

### Immediate Tasks:
1. ✅ Set up MySQL database
2. ✅ Configure backend environment
3. ✅ Test API endpoints
4. ✅ Verify frontend integration

### Future Enhancements:
1. Add product management API
2. Implement order processing
3. Add admin dashboard
4. Implement real-time notifications
5. Add payment integration
6. Implement email verification

## 🔒 Security Notes

- JWT tokens expire after 24 hours
- Passwords are hashed using bcrypt
- API endpoints are protected with authentication
- CORS is configured for localhost only
- SQL injection protection via parameterized queries

## 📞 Support

If you encounter issues:

1. Check the console logs in both frontend and backend
2. Verify database connection and tables
3. Test API endpoints individually
4. Check browser network tab for API calls

---

**🎉 Congratulations! Your FreshField Dairy full-stack application is now ready!** 