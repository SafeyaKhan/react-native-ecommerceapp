import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

import {
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Auth route working');
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

router.get('/reset-password/:token', (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).send('Invalid reset link');
  }

  res.send(`
    <html>
      <body>
        <h2>Reset Password</h2>

        <input type="password" id="password" placeholder="New password"/>
        <input type="password" id="confirm" placeholder="Confirm password"/>

        <button onclick="resetPassword()">Reset</button>

        <p id="msg"></p>

        <script>
          async function resetPassword() {
            const password = document.getElementById('password').value;
            const confirm = document.getElementById('confirm').value;
            const msg = document.getElementById('msg');

            if (password !== confirm) {
              msg.innerText = "Passwords do not match";
              return;
            }

            const res = await fetch("/api/auth/reset-password/${token}", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ password })
            });

            const data = await res.json();
            msg.innerText = data.message;
          }
        </script>
      </body>
    </html>
  `);
});

export default router;
