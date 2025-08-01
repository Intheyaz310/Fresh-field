import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing FreshField Dairy API...\n');

  try {
    // Test 1: Check if server is running
    console.log('1. Testing server connection...');
    const response = await fetch('http://localhost:5000/');
    const data = await response.json();
    console.log('✅ Server is running:', data.message);

    // Test 2: Test user registration
    console.log('\n2. Testing user registration...');
    const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        phone: '+1234567890',
        address: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zip_code: '12345',
        branch: 'Test Branch'
      }),
    });

    if (registerResponse.ok) {
      const registerData = await registerResponse.json();
      console.log('✅ Registration successful:', registerData.message);
      
      // Test 3: Test user login
      console.log('\n3. Testing user login...');
      const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        }),
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        console.log('✅ Login successful:', loginData.message);
        
        // Test 4: Test get user profile
        console.log('\n4. Testing get user profile...');
        const profileResponse = await fetch(`${API_BASE_URL}/user/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${loginData.token}`,
            'Content-Type': 'application/json',
          },
        });

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          console.log('✅ Profile retrieved successfully');
          console.log('   User:', profileData.user.name);
        } else {
          console.log('❌ Profile retrieval failed');
        }
      } else {
        console.log('❌ Login failed');
      }
    } else {
      console.log('❌ Registration failed');
    }

    // Test 5: Test get all users
    console.log('\n5. Testing get all users...');
    const usersResponse = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (usersResponse.ok) {
      const usersData = await usersResponse.json();
      console.log('✅ Users retrieved successfully');
      console.log(`   Total users: ${usersData.users.length}`);
    } else {
      console.log('❌ Users retrieval failed');
    }

  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

// Run the test
testAPI();