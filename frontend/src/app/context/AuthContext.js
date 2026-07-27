"use client"
import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isloggedin, setisloggedin] = useState(false);
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState([])

 
  const checkAuth = useCallback(async () => {
   
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkauth`, {
        credentials: "include",
         cache: "no-store",
      });

      const data = await res.json();
      setisloggedin(data.success);
    } catch (error) {
      setisloggedin(false);
    } finally {
      setloading(false);
    }
  }, []);
  const getuser = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getuser`, {
        credentials: "include",
      });
      const resdata = await response.json();
      if(resdata.success){

        setuser(resdata.data)
      }
    } catch (error) {
      console.log(error.message)
    }



  }, [])

  useEffect(() => {
    
    checkAuth();
  }, [checkAuth]);



  useEffect(() => {
    getuser();
  }, [getuser]);
  return (
    <AuthContext.Provider value={{ isloggedin, setisloggedin, checkAuth, user, setuser, getuser, loading  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);