const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const {
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

/* =========================
   REGISTER
========================= */
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

/* =========================
   LOGIN
========================= */
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

/* =========================
   FORGOT PASSWORD
========================= */
router.post('/forgot-password', forgotPassword);

/* =========================
   RESET PASSWORD (API)
========================= */
router.put('/reset-password/:token', resetPassword);

/* =========================
   RESET PASSWORD PAGE (WEB UI)
========================= */
router.get('/reset-password/:token', (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).send('Invalid reset link');
  }

  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Reset Password</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    font-family: Arial, sans-serif;
    background:#f5f5f5;
  "
>
  <div
    style="
      display:flex;
      justify-content:center;
      align-items:center;
      height:100vh;
    "
  >
    <div
      style="
        background:white;
        padding:30px;
        border-radius:10px;
        width:320px;
        box-shadow:0 0 10px rgba(0,0,0,0.1);
      "
    >
      <h2 style="text-align:center;">Reset Password</h2>

      <input
        type="password"
        id="password"
        placeholder="New password"
        style="
          width:100%;
          padding:12px;
          margin-bottom:15px;
          border:1px solid #ccc;
          border-radius:5px;
          box-sizing:border-box;
        "
      />

      <input
        type="password"
        id="confirm"
        placeholder="Confirm password"
        style="
          width:100%;
          padding:12px;
          margin-bottom:15px;
          border:1px solid #ccc;
          border-radius:5px;
          box-sizing:border-box;
        "
      />

      <button
        onclick="reset()"
        style="
          width:100%;
          background-color:#e96e6e;
          border:none;
          border-radius:8px;
          padding:12px;
          color:white;
          font-size:16px;
          font-weight:600;
          cursor:pointer;
        "
      >
        Reset Password
      </button>

      <p
        id="msg"
        style="
          text-align:center;
          margin-top:15px;
          color:#333;
        "
      ></p>
    </div>
  </div>

  <script>
    async function reset() {
      const password = document.getElementById('password').value;
      const confirm = document.getElementById('confirm').value;
      const msg = document.getElementById('msg');

      if (password !== confirm) {
        msg.innerText = 'Passwords do not match';
        return;
      }

      try {
        const res = await fetch('/api/auth/reset-password/${token}', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
        });

        const data = await res.json();

        msg.innerText = data.message;
      } catch (err) {
        msg.innerText = 'Something went wrong';
      }
    }
  </script>
</body>
</html>
`);
});

module.exports = router;
