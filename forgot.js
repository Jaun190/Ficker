import sendResetMail from "../../lib/mailer"; // Pfad anpassen
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ghfzdgaunxblpudkmxmy.supabase.co", // deine URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."   // dein public anon key
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://growempire.vercel.app/reset" // Zielseite anpassen
  });

  if (error) return res.status(500).json({ message: "Fehler bei Supabase." });

  await sendResetMail(email, "Link wurde von Supabase gesendet.");

  res.status(200).json({ message: "Mail verschickt." });
}
