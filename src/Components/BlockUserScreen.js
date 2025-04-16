import React, { use } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, addDoc, where, getDocs, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import "../styles/BlockUserScreen.css"; // Import your CSS file

export default function BlockUserScreen() {

    const [reportedUsers, setReportedUsers] = useState([]);
    const [counts, setCounts] = useState([]);

    const suspendUser = async (user) => {

        const suspendUsersRef = collection(db, "SuspendedUsers");
        const q = query(suspendUsersRef, where("username", "==", user));
        const snapshot = await getDocs(q);

        if (snapshot.docs.length === 0) {
            await addDoc(suspendUsersRef, {
                username: user,
            });
            alert('User has been suspended!');
        }
    }

    const unsuspendUser = async (user) => {
    
      const suspendUsersRef = collection(db, "SuspendedUsers");
      const q = query(suspendUsersRef, where("username", "==", user));
      const snapshot = await getDocs(q);

      if (snapshot.docs.length !== 0) {
          await deleteDoc(snapshot.docs[0].ref);
          console.log("User unsuspended:", user);
          alert('User has been unsuspended!');
      }
    }

    function ListComponent({ items }) {
        return (
          <ul>
            {items.map((item) => (
              <li key={item.user}>
                {item.user}{" "}
                <button onClick={() => suspendUser(item)}>
                  Suspend User
                </button>
                <button onClick={() => unsuspendUser(item)}>
                  Unsuspend User
                </button>
              </li>
            ))}
          </ul>
        );
    }

    useEffect(() => {
    
        const reportRef = collection(db, "reports");
        const q = query(reportRef);
    
        const unsubscribe = onSnapshot(q, (snapshot) => {
    
          const reportedUsers = snapshot.docs.map((doc) => {

            const firebaseData = doc.data();
            counts[firebaseData.user] = (counts[firebaseData.user] || 0) + 1
            return firebaseData.user;

          });
    
          setReportedUsers(reportedUsers);
        });
    
        return () => unsubscribe();
    
      }, []);

    return (
      
      <div className="container">
      <h1 className="header">Reported Users</h1>
      <div className="user-list">
        {[...new Set(reportedUsers)].map((user) => (
          <div key={user} className="user-card">
            <div className="username">{user} <p style={{color: '	#A9A9A9	'}}>Reported {counts[user]} times</p></div>
            <div className="button-group">
              <button
                onClick={() => suspendUser(user)}
                className="suspend-button"
              >
                Suspend
              </button>
              <button
                onClick={() => unsuspendUser(user)}
                className="unsuspend-button"
              >
                Unsuspend
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
      
    );
}