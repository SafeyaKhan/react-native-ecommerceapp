// const User = require('../models/User');
// const crypto = require('crypto');
// const bcrypt = require('bcryptjs');
// const sendEmail = require('../utils/sendEmail');

// // FORGOT PASSWORD
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     // generate token
//     const resetToken = crypto.randomBytes(32).toString('hex');

//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

//     await user.save();

//     // Generate both mobile and web links
//     const mobileLink = `${process.env.APP_DEEPLINK}reset-password/${resetToken}`;
//     const webLink = `${process.env.WEB_RESET_URL}?token=${resetToken}`;

//     const plainText = `
// You requested a password reset.

// Mobile App:
// ${mobileLink}

// Browser/Web:
// ${webLink}

// If you did not request this, ignore this email.
// This link will expire in 15 minutes.
// `;

//     const htmlText = `
// <html>
//   <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//     <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
//       <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
//       <p style="font-size: 16px; margin-bottom: 20px;">You requested a password reset for your account.</p>
//       <p style="font-size: 14px; margin-bottom: 20px; color: #666;">This link will expire in 15 minutes.</p>

//       <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

//       <h3 style="color: #007AFF; font-size: 14px; margin-bottom: 15px;">📱 For Mobile App Users:</h3>
//       <div style="text-align: center; margin: 20px 0;">
//         <a href="${mobileLink}" style="display: inline-block; background-color: #007AFF; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
//           Reset Password in App
//         </a>
//       </div>
//       <p style="font-size: 12px; color: #666; text-align: center;">Click above to open the app and reset your password</p>

//       <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">

//       <h3 style="color: #34C759; font-size: 14px; margin-bottom: 15px;">🌐 For Web Browser:</h3>
//       <div style="text-align: center; margin: 20px 0;">
//         <a href="${webLink}" style="display: inline-block; background-color: #34C759; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
//           Reset Password in Browser
//         </a>
//       </div>
//       <p style="font-size: 12px; color: #666; text-align: center;">Click above to reset your password in your browser</p>

//       <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">

//       <h3 style="font-size: 14px; margin-bottom: 10px;">If buttons don't work, copy and paste these links:</h3>
//       <p style="font-size: 12px; word-break: break-all; background-color: #f5f5f5; padding: 10px; border-radius: 3px; color: #0066cc; margin-bottom: 10px;">
//         <strong>Mobile:</strong> <a href="${mobileLink}" style="color: #0066cc; text-decoration: none;">${mobileLink}</a>
//       </p>
//       <p style="font-size: 12px; word-break: break-all; background-color: #f5f5f5; padding: 10px; border-radius: 3px; color: #0066cc;">
//         <strong>Web:</strong> <a href="${webLink}" style="color: #0066cc; text-decoration: none;">${webLink}</a>
//       </p>

//       <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
//       <p style="font-size: 12px; color: #999; text-align: center;">If you did not request this, please ignore this email and your account will remain secure.</p>
//     </div>
//   </body>
// </html>
// `;

//     await sendEmail(user.email, 'Password Reset', plainText, htmlText);

//     res.status(200).json({
//       success: true,
//       message: 'Reset email sent successfully',
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: 'Server Error',
//     });
//   }
// };
// exports.resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;

//     const { password } = req.body;

//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid or expired token',
//       });
//     }

//     // hash new password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     user.password = hashedPassword;

//     // clear reset fields
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: 'Password reset successful',
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: 'Server Error',
//     });
//   }
// };
const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

/* =========================
   FORGOT PASSWORD
========================= */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Generate raw token (send to user)
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash token for DB storage (SECURE)
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Save hashed token + expiry
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min

    await user.save();

    // LINKS
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

/* =========================
   RESET PASSWORD
========================= */
exports.resetPassword = async (req, res) => {
  try {
    const token = req.params.token || req.query.token;
    const { password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: 'Token and password required',
      });
    }

    // Hash incoming token to match DB
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

    // Update password
    user.password = await bcrypt.hash(password, 10);

    // Clear reset fields
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
