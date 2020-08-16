import { useState, useEffect } from 'react';
import { projectFirestore } from '../../firebaseConfig';

export default function useStatuses() {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    projectFirestore.collection(`statuses`).onSnapshot(collection => {
      const data = collection.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        }
      });
      setStatuses([...data]);
    });
  }, []);
  return { statuses };
}
