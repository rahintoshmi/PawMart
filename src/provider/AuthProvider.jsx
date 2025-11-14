import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email, password);
    }


    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);

            const updatedUser = {
                ...result.user,
                photoURL: result.user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + result.user.uid,
            };

            setUser(updatedUser);

            return result;  
        } catch (err) {
            console.error(err);
            throw err;       
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const updatedUser = {
                    ...user,
                    photoURL: user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user.uid,
                };
                setUser(updatedUser);
            } else {
                setUser(null);
            }
          
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        loading,
        setLoading,
        signInWithGoogle,
    };
    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;