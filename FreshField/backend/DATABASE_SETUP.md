# MySQL Database Setup Guide

## Step 1: Install MySQL

### Option 1: Download MySQL Installer (Recommended)
1. Go to https://dev.mysql.com/downloads/installer/
2. Download "MySQL Installer for Windows"
3. Run the installer and follow the setup wizard
4. Choose "Developer Default" or "Server only" installation
5. Set a root password (remember this!)
6. Complete the installation

### Option 2: Use XAMPP (Alternative)
1. Download XAMPP from https://www.apachefriends.org/
2. Install XAMPP
3. Start Apache and MySQL services
4. Access phpMyAdmin at http://localhost/phpmyadmin

## Step 2: Create Database and Tables

### Using MySQL Command Line:
1. Open Command Prompt as Administrator
2. Navigate to MySQL bin directory (usually `C:\Program Files\MySQL\MySQL Server 8.0\bin`)
3. Run: `mysql -u root -p`
4. Enter your password when prompted
5. Run the SQL commands from `setup-database.sql`

### Using phpMyAdmin (if using XAMPP):
1. Open http://localhost/phpmyadmin
2. Click "New" to create a new database
3. Name it `freshfield_dairy`
4. Click "SQL" tab
5. Copy and paste the contents of `setup-database.sql`
6. Click "Go" to execute

### Using MySQL Workbench:
1. Download MySQL Workbench from https://dev.mysql.com/downloads/workbench/
2. Connect to your MySQL server
3. Create a new schema named `freshfield_dairy`
4. Open the SQL script `setup-database.sql`
5. Execute the script

## Step 3: Update Configuration

After creating the database, update the `config.env` file with your MySQL credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=freshfield_dairy
DB_PORT=3306
```

## Step 4: Test Database Connection

Run the backend server to test the connection:
```bash
npm start
```

You should see: "✅ Database connected successfully!"

## Troubleshooting

### Common Issues:
1. **Access denied**: Check your MySQL username and password
2. **Connection refused**: Make sure MySQL service is running
3. **Database not found**: Make sure you created the `freshfield_dairy` database

### Start MySQL Service (Windows):
1. Open Services (services.msc)
2. Find "MySQL80" or "MySQL"
3. Right-click and select "Start"

### Reset MySQL Password:
If you forgot your password, you may need to reset it:
1. Stop MySQL service
2. Start MySQL in safe mode
3. Reset password
4. Restart MySQL service

## Quick Test Commands

Once MySQL is installed, you can test with these commands:

```bash
# Test MySQL connection
mysql -u root -p

# Create database manually
CREATE DATABASE freshfield_dairy;
USE freshfield_dairy;

# Check if database exists
SHOW DATABASES;
``` 