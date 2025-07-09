import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

// ✅ Supabase-Projekt
const supabase = createClient(
  "https://ghfzdgaunxblpudkmxmy.supabase.co", // Deine Supabase-URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZnpkZ2F1bnhibHB1ZGtteG15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDI5NTksImV4cCI6MjA2NjI3ODk1OX0.J8ni4SszaI33ljthdEjqXf8ZKFCs4uWnRZZDyU0IlUU"
);

// ✅ SMTP-Transporter (MailerSend)
const transporter = nodemailer.createTransport({
  host: "smtp.mailersend.net",
  port: 587,
  secure: false,
  auth: {
    user: "MS_R1YRBb@test-yxj6ij91yo14d0z2r.mailersend.net",
    pass: "mssp.12H91c8.neqvygmy5n5g0p7w.PuqJ1u8",
  },
});

// ✅ Funktion für Passwort-Reset
export async function sendPasswordResetEmail(email) {
  // Supabase-Reset-Link generieren
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://growempire.vercel.app/update-password",
  });

  if (error) {
    console.error("Supabase-Fehler:", error.message);
    return { success: false, message: "Supabase-Reset fehlgeschlagen: " + error.message };
  }

  // E-Mail versenden
  const mailOptions = {
    from: "GrowEmpire <support@growempire.ch>",
    to: email,
    subject: "🔐 Passwort zurücksetzen – GrowEmpire",
    text: "Bitte überprüfe deine E-Mails und klicke auf den Link zur Passwortzurücksetzung.",
    html: `<p>Klicke auf den Link in deiner E-Mail, um dein Passwort zurückzusetzen. Falls du keine E-Mail erhalten hast, überprüfe deinen Spam-Ordner.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "E-Mail erfolgreich versendet." };
  } catch (err) {
    console.error("E-Mail-Fehler:", err.message);
    return { success: false, message: "Fehler beim E-Mail-Versand: " + err.message };
  }
}
