"use client"
import { createContext, useContext, useState, useCallback ,useEffect} from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isloggedin, setisloggedin] = useState(false);
      
    
    const checkAuth = useCallback(async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkauth`, {
      credentials: "include",
    });
    
    const data = await res.json();
    setisloggedin(data.success);
  } catch (error) {
    setisloggedin(false);
  }
}, []);
    // useEffect(() => {
    //     checkAuth();  
    // }, [checkAuth]);     
        
    

    return (
        <AuthContext.Provider value={{ isloggedin, setisloggedin ,checkAuth}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);