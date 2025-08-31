const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let userList = [
  { email: 'demo@example.com', password: 'password123' },
  { email: 'test@example.com', password: 'test123' }
];

app.post('/api/login', (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  
  console.log('Someone trying to login:', userEmail);
  
  const foundUser = userList.find(user => user.email === userEmail);
  
  if (!foundUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  if (foundUser.password !== userPassword) {
    return res.status(401).json({ message: 'Wrong password' });
  }
  
  console.log('Login successful for:', userEmail);
  res.json({ message: 'Login successful', email: userEmail });
});

app.post('/api/signup', (req, res) => {
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  
  console.log('Someone trying to signup:', newEmail);
  
  const existingUser = userList.find(user => user.email === newEmail);
  
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }
  
  userList.push({ email: newEmail, password: newPassword });
  
  console.log('New user created:', newEmail);
  console.log('Total users now:', userList.length);
  
  res.json({ message: 'Account created successfully' });
});

app.get('/api/users', (req, res) => {
  const safeUserList = userList.map(user => ({ email: user.email }));
  res.json(safeUserList);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log('✅ Ready to accept login/signup requests!');
});