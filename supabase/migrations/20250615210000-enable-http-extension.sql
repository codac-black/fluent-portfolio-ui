-- Enable the http extension
CREATE EXTENSION IF NOT EXISTS http WITH SCHEMA extensions;

-- Drop the existing trigger and function
DROP TRIGGER IF EXISTS on_contact_message_created ON contact_messages;
DROP FUNCTION IF EXISTS public.handle_new_contact_message();

-- Create the function with the correct schema reference
CREATE OR REPLACE FUNCTION public.handle_new_contact_message()
RETURNS trigger AS $$
BEGIN
  -- Call the Edge Function using extensions.http_post
  PERFORM
    extensions.http_post(
      url := CONCAT(current_setting('app.settings.pgrest_url'), '/functions/v1/send-to-discord'),
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', CONCAT('Bearer ', current_setting('app.settings.service_role_key'))
      ),
      body := jsonb_build_object(
        'name', NEW.name,
        'email', NEW.email,
        'message', NEW.message
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_contact_message_created
  AFTER INSERT ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_contact_message(); 