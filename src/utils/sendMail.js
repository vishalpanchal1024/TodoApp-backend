import { fileURLToPath } from 'url';
import ejs from 'ejs';
import path from 'path';
import { envConfig } from '../config/env.config.js';
import { transpoter } from '../config/nodemailer.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const SendMail = async (templatename, templateData, senderDetails) => {
  console.log(templatename, templateData, senderDetails)
  try {
    const newPath = path.join(__dirname, '..', 'template', templatename);

    const html = await ejs.renderFile(newPath, templateData);

    const mailOptions = {
      from: envConfig.EMAILID,
      to: senderDetails.email,
      subject: senderDetails.subject,
      html: html,
    };

    await transpoter.sendMail(mailOptions);
    console.log('Mail sent successfully');
  } catch (error) {
    console.error('Error sending mail:', error);
  }
};
