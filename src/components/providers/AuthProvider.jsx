import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useEffect, useState } from 'react';
import app from '../firabase/firabase.config';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
       return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password) => {
        setLoading(true)
       return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            return unsubscribe();
        }
    },[])
    
    const logOut = () => {
        signOut(auth)
    }

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;