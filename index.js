const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let userList = [
  { email: 'demo@example.com', password: 'password123' },
  { email: 'test@example.com', password: 'test123' }
];

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Someone trying to login:', email);

  const foundUser = userList.find(user => user.email === email);

  if (!foundUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (foundUser.password !== password) {
    return res.status(401).json({ message: 'Wrong password' });
  }

  console.log('Login successful for:', email);
  res.json({ message: 'Login successful', email });
});

app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  console.log('Someone trying to signup:', email);

  const existingUser = userList.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  userList.push({ email, password });
  console.log('New user created:', email);
  console.log('Total users now:', userList.length);

  res.json({ message: 'Account created successfully' });
});

app.get('/api/users', (req, res) => {
  const safeUserList = userList.map(user => ({ email: user.email }));
  res.json(safeUserList);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log('✅ Ready to accept login/signup requests!');
});
