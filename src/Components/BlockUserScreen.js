import React from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, addDoc, where, getDocs, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';

export default function BlockUserScreen() {

    const [reportedUsers, setReportedUsers] = useState([]);

    const suspendUser = async (item) => {

        const suspendUsersRef = collection(db, "SuspendedUsers");
        const q = query(suspendUsersRef, where("username", "==", item.user));
        const snapshot = await getDocs(q);

        if (snapshot.docs.length === 0) {
            await addDoc(suspendUsersRef, {
                username: item.user,
            });
            console.log("User suspended:", item.user);
        }
    }

    const unsuspendUser = async (item) => {
    
      const suspendUsersRef = collection(db, "SuspendedUsers");
      const q = query(suspendUsersRef, where("username", "==", item.user));
      const snapshot = await getDocs(q);

      if (snapshot.docs.length !== 0) {
          await deleteDoc(snapshot.docs[0].ref);
          console.log("User unsuspended:", item.user);
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
            // console.log(doc.data())
            const firebaseData = doc.data();
            return {
              user: firebaseData.user
            };
          });
    
          setReportedUsers(reportedUsers);
        });
    
        return () => unsubscribe();
    
      }, []);

    return (
        <div>
            <ListComponent items={reportedUsers} />
        </div>
    );
}