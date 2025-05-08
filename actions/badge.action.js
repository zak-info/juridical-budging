"use server"
import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { connect } from '@/models/mongodb';
import Condidat from '@/models/condidat.model';
import { revalidatePath } from 'next/cache';
import User from '@/models/user.model';


import nodeHtmlToImage from 'node-html-to-image';


export async function SendBudge(body) {
  console.log("body :", body);
  const { fullname, fonction, type, email } = body;

  const alifLogoPath = path.join(process.cwd(), 'public', 'images', 'aliflogo.png');
  const qrCodePath = path.join(process.cwd(), 'public', 'images', 'qrcode.png');
  const alifLogoBase64 = fs.readFileSync(alifLogoPath, { encoding: 'base64' });
  const qrCodeBase64 = fs.readFileSync(qrCodePath, { encoding: 'base64' });

  const html = `<!DOCTYPE html>
    <html>
      <head>
        <style>
          html {
            font-size: 16px; 
          }
          body {
            font-family: sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: #f0f0f0;
          }
          .badge {
            width: 360px;
            height: 540px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            text-align: center;
            padding: 24px 16px;
            box-sizing: border-box;
            position: relative;
          }
          .partners {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #333;
            margin-bottom: 8px;
          }
          .logo {
            margin: 8px 0;
          }
          .main-title {
            font-size: 36px;
            color: #1e3a8a;
            font-weight: bold;
          }
          .main-title span {
            font-size: 18px;
            color: #facc15;
            font-weight: bold;
          }
          .subtitle {
            font-size: 16px;
            color: #1e3a8a;
            margin: 8px 0;
          }
          .type {
            background: #1e3a8a;
            color: white;
            padding: 8px 0;
            font-size: 18px;
            font-weight: bold;
            margin-top: 24px;
          }
          .qr {
            margin-top: 16px;
          }
          .qr img {
            width: 100px;
            height: 100px;
          }
        </style>
      </head>
      <body>
        <div class="badge">
          <div class="partners">
            <div>AliF Event<br>AliF Event</div>
            <div>AliF Event<br>AliF Event</div>
          </div>
          <div class="logo">
            <img src="data:image/png;base64,${alifLogoBase64}" alt="Logo" style="width: 80px;" />
          </div>
          <div class="main-title">ALIF <span>2025</span></div>
          <div class="subtitle">${fullname}</div>
          <div class="subtitle">${fonction}</div>
          <div class="type">${type.toUpperCase()}</div>
          <div class="qr">
            <img src="data:image/png;base64,${qrCodeBase64}" alt="qr code" />
          </div>
        </div>
      </body>
    </html>`;

  try {
    const filePath = path.join(os.tmpdir(), `badge-${Date.now()}.png`);

    await nodeHtmlToImage({
      output: filePath,
      html,
      type: 'png',
      quality: 100,
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'zakariabensilete@gmail.com',
        pass: 'fnypqyzuqrjwrpbp',
      },
    });

    await transporter.sendMail({
      from: 'alifevent@gmail.com',
      to: email,
      subject: 'Votre badge ALIF 2025',
      text: `Bonjour ${fullname},\n\nVoici votre badge en pièce jointe.`,
      attachments: [
        {
          filename: 'badge.png',
          path: filePath,
        },
      ],
    });

    fs.unlinkSync(filePath); // Clean up temp file
    return { success: true };
  } catch (err) {
    console.error('❌ Error generating badge:', err);
    return { success: false, error: err };
  }
}




export async function getCondidats() {
    try {
        await connect();
        const condidats = await User.find({});
        return { success: true, condidats };
    } catch (error) {
        console.error("Error creating MongoDB Medicationtable", error); // Log the error for debugging
        return { success: false, msg: "An unknown error occurred. " + error.message };
    }
}

export async function createCondidat(data) {
    try {   
        await connect();
        const condidat = await User.create(data);
        revalidatePath("/", "page")
        return { success: true, condidat };
    } catch (error) {
        console.error("Error creating MongoDB Condidat", error); // Log the error for debugging
        return { success: false, msg: "An unknown error occurred. " + error.message };
    }
}