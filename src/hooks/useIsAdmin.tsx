
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

/**
 * Returns { isAdmin, loading }
 * isAdmin = true if current supabase user is an admin, false otherwise.
 */
export function useIsAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    setLoading(true);

    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single()
      .then(({ data, error }) => {
        setIsAdmin(Boolean(data && data.role === "admin"));
        setLoading(false);
      });
  }, [user]);

  return { isAdmin, loading };
}
