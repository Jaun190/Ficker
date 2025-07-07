// auth.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://ghfzdgaunxblpudkmxmy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZnpkZ2F1bnhibHB1ZGtteG15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDI5NTksImV4cCI6MjA2NjI3ODk1OX0.J8ni4SszaI33ljthdEjqXf8ZKFCs4uWnRZZDyU0IlUU'
const supabase = createClient(supabaseUrl, supabaseKey)

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const errorMsg = document.getElementById('error-msg')

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    errorMsg.textContent = 'Login fehlgeschlagen: ' + error.message
  } else {
    // Erfolgreich eingeloggt – weiterleiten
    window.location.href = 'dashboard.html'
  }
})
