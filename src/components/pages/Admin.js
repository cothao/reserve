import React,{useState,useEffect} from "react";
import "./Admin.css";
import { db  } from "./firebase";
import { doc, snapshot, onSnapshot, collection, query, where, QueryDocumentSnapshot} from "firebase/firestore";
import { auth, logInWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// This only serves as a temporary test of the confirmation of events, the calendar page is pretty full so if we can pass
// the userObject we should be able to print the end result and change the confirmed: boolean true, showing its active
// this will be a way to "cancel" reservations through firebase as an admin but changing the boolean without deleting
// the entire user.
function Admin() {
 
  const [user] = useAuthState(auth);
  const [data, setData] = useState();
  
  useEffect(() => {
    // const x = userObject
    const q = query(collection(db, "users"))
    const unsub = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(doc => doc.data())
      console.log(data[2]);
      setData(data);
    })
    return () => unsub;
  }, []);

  return(
    <div className="Admin">
      <h1>Confirmation</h1>
      <div>User: {user?.email}</div>
      <div>
        <button>Reservations:</button>
        <h1>
          {data[2].name}
        </h1>
      </div>
    </div>
  )
}


export default Admin;