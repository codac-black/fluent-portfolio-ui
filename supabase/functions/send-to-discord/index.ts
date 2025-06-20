import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, message } = await req.json()
    
    // Get the webhook URL from environment variables
    const webhookUrl = Deno.env.get('DISCORD_WEBHOOK_URL')
    if (!webhookUrl) {
      throw new Error('Discord webhook URL not configured')
    }

    // Create the Discord message embed
    const embed = {
      title: '📬 New Contact Form Message',
      color: 0x7289DA, // Discord blurple color
      fields: [
        {
          name: '👤 Name',
          value: name,
          inline: true
        },
        {
          name: '📧 Email',
          value: email,
          inline: true
        },
        {
          name: '💬 Message',
          value: message
        }
      ],
      timestamp: new Date().toISOString()
    }

    // Send the message to Discord
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed]
      })
    })

    if (!response.ok) {
      throw new Error('Failed to send message to Discord')
    }

    return new Response(
      JSON.stringify({ message: 'Message sent to Discord successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})