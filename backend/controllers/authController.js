import User from '../models/User.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendEmail.js';

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');

    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const mobileLink = `${process.env.APP_DEEPLINK}/reset-password/${resetToken}`;
    const webLink = `${process.env.WEB_RESET_URL}/api/auth/reset-password/${resetToken}`;

    const message = `
You requested a password reset.

Mobile:
${mobileLink}

Web:
${webLink}

This link expires in 15 minutes.
`;

    const html = `
      <h2>Password Reset</h2>
      <p>Click below to reset your password:</p>

      <a href="${mobileLink}">Reset in App</a><br/>
      <a href="${webLink}">Reset in Browser</a>
    `;

    await sendEmail(user.email, 'Password Reset', message, html);

    res.status(200).json({
      success: true,
      message: 'Reset email sent successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const token = req.params.token || req.query.token;
    const { password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: 'Token and password required',
      });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token',
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
