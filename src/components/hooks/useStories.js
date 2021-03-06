import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { projectFirestore } from '../../firebaseConfig';
import { setActiveStory } from '../../redux/actions';

export default function useStories() {
  const dispatch = useDispatch();
  const session = useSelector(state => state.sessionName);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (session) {
      setInterval(() => {
        projectFirestore.collection(`sessions/${session}/stories`).orderBy('position').onSnapshot(collection => {
          setLoading(false);
          const data = collection.docs.map(doc => {
            if (doc.data().status === 2) {
              dispatch(setActiveStory({ ...doc.data(), id: doc.id }));
            }
            if(doc.data().isLast){
              dispatch(setActiveStory(null));
            }
            return {
              ...doc.data(),
              id: doc.id
            }
          });
          setStories([...data]);
        });
      }, 2000);
    }
  }, [session, dispatch]);
  return { stories, loading };
}