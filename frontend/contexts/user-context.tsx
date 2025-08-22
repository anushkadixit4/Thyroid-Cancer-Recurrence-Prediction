"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type UserContextType = {
  user: User | null;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        console.log('Checking user auth...');
        const supabase = createClientComponentClient();
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error('Auth error:', error);
          throw error;
        }

        console.log('User auth result:', user ? 'Authenticated' : 'Not authenticated');
        setUser(user);
      } catch (error) {
        console.error('Failed to check auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext); 