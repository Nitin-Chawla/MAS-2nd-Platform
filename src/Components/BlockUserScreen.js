import React from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useState, useEffect } from 'react';

export default function BlockUserScreen() {

    const [reportedUsers, setReportedUsers] = useState([]);

    function ListComponent({ items }) {
        return (
          <ul>
            {items.map((item) => (
              <li key={item.user}>{item.user}</li>
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