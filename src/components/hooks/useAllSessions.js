import { useState, useEffect } from 'react';
import { projectFirestore } from '../../firebaseConfig';

export default function useAllSession() {
  const [allSessions, setAllSessions] = useState([]);

  useEffect(() => {
    projectFirestore.collection(`sessions`).onSnapshot(collection => {
      const data = collection.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        }
      });
      setAllSessions([...data]);
    });
  }, []);
  return { allSessions };
}
