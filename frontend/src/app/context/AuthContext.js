"use client"
import { createContext, useContext, useState, useCallback ,useEffect} from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isloggedin, setisloggedin] = useState(false);
    const[user,setuser]=useState([])
      
    console.log("AuthProvider component render ho raha hai");
    const checkAuth = useCallback(async () => {
        console.log("checkAuth function CALL ho raha hai");
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
    const getuser = useCallback( async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getuser`, {
                    credentials: "include",
                });
                const data = await response.json();
                setuser(data.data)
            } catch (error) {
                console.log(error.message)
            }

        

    },[])
   
    useEffect(() => {
        console.log("useEffect chala");
        checkAuth();  
    }, [checkAuth]);     
      
        
 
  useEffect(() => {
        console.log("useEffect chala");
       getuser();  
    }, [getuser]); 
    return (
        <AuthContext.Provider value={{ isloggedin, setisloggedin ,checkAuth,user,setuser,getuser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);