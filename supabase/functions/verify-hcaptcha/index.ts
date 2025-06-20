import { serve } from 'std/server';

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { token } = await req.json();
    const secret = Deno.env.get('HCAPTCHA_SECRET_KEY');
    if (!token || !secret) {
      return new Response(JSON.stringify({ success: false, error: 'Missing token or secret' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      body: new URLSearchParams({
        secret,
        response: token,
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}); 