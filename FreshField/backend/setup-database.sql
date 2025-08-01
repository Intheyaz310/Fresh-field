-- FreshField Dairy Database Setup
-- Run this script in MySQL to create the database and tables

-- Create database
CREATE DATABASE IF NOT EXISTS freshfield_dairy;
USE freshfield_dairy;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  zip_code VARCHAR(20),
  branch VARCHAR(100),
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  image_url VARCHAR(500),
  stock_quantity INT DEFAULT 0,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  delivery_address TEXT,
  delivery_instructions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Insert sample products
INSERT INTO products (name, description, price, category, image_url, stock_quantity) VALUES
('Fresh Whole Milk', 'Pure, unprocessed whole milk from our happy cows', 4.99, 'Milk', '/images/whole-milk.jpg', 100),
('Organic Yogurt', 'Creamy organic yogurt made with live cultures', 3.99, 'Yogurt', '/images/yogurt.jpg', 75),
('Farm Fresh Butter', 'Rich, creamy butter churned from fresh cream', 6.99, 'Butter', '/images/butter.jpg', 50),
('A2 Milk', 'Premium A2 protein milk for better digestion', 5.99, 'Milk', '/images/a2-milk.jpg', 60),
('Greek Yogurt', 'Thick and creamy Greek-style yogurt', 4.49, 'Yogurt', '/images/greek-yogurt.jpg', 80),
('Fresh Cream', 'Heavy cream perfect for cooking and baking', 3.49, 'Cream', '/images/cream.jpg', 40),
('Farmhouse Cheese', 'Aged cheddar cheese from our dairy', 8.99, 'Cheese', '/images/cheese.jpg', 30),
('Chocolate Milk', 'Delicious chocolate milk for kids and adults', 4.49, 'Milk', '/images/chocolate-milk.jpg', 90);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_available ON products(is_available);

-- Show tables
SHOW TABLES;

-- Show sample data
SELECT * FROM products LIMIT 5; 