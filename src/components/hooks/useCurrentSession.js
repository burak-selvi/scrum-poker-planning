import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { projectFirestore } from '../../firebaseConfig';

export default function useCurrentSession() {
  const session = useSelector(state => state.sessionName);
  const [currentSession, setCurrentSession] = useState({});

  useEffect(() => {
    if (session) {
      projectFirestore.collection(`sessions`).where('name', '==', session).onSnapshot(collection => {
        const data = collection.docs.map(doc => {
          return {
            ...doc.data()
          }
        });
        setCurrentSession(data[0]);
      });
    }
  }, [session]);
  return { currentSession };
}
