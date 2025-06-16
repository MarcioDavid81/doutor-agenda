'use server';

import { readFileSync } from "fs";
import path from "path";
import puppeteer from "puppeteer";

interface Props {
  doctor: string;
  patient: string;
  contentHtml: string;
}

export async function generatePrescriptionPdf({ doctor, patient, contentHtml }: Props) {
  const date = new Date().toLocaleDateString("pt-BR");

  // Lê o logo diretamente da pasta public
  const logoPath = path.resolve("public/logo-dark.svg");
  const logoSvg = readFileSync(logoPath, "utf8");

  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <style>
          body {
            font-family: sans-serif;
            padding: 40px;
            color: #111;
          }
          .header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 32px;
          }
          .logo {
            height: 48px;
            width: auto;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
          }
          .section {
            margin-bottom: 24px;
          }
          .footer {
            margin-top: 48px;
            font-size: 14px;
            color: #555;
            border-top: 1px solid #ddd;
            padding-top: 16px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">${logoSvg}</div>
          <div class="title">Receita Médica</div>
        </div>

        <div class="section">
          <p><strong>Médico:</strong> ${doctor}</p>
          <p><strong>Paciente:</strong> ${patient}</p>
          <p><strong>Data:</strong> ${date}</p>
        </div>

        <hr />

        <div class="section">${contentHtml}</div>

        <div class="footer">
          Assinatura do profissional<br />
          ________________________________
        </div>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

  await browser.close();

  return Buffer.from(pdfBuffer);
}
