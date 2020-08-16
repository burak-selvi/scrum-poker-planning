import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { projectFirestore } from '../../firebaseConfig';

export default function useVotes() {
  const { userId } = useSelector(state => state.user);
  const session = useSelector(state => state.sessionName);
  const activeStory = useSelector(state => state.activeStory);
  const [storyVotes, setStoryVotes] = useState([]);
  const [currentVote, setCurrentVote] = useState('');

  useEffect(() => {
    if (activeStory?.name) {
      projectFirestore.collection(`sessions/${session}/stories/${activeStory.name}/votes`).orderBy('position').onSnapshot(collection => {
        const data = collection.docs.map(doc => {
          if (doc.id === userId) {
            setCurrentVote(doc.data().point);
          }
          return {
            ...doc.data(),
            id: doc.id
          }
        });
        setStoryVotes([...data]);
      });
    }
  }, [activeStory, session, userId]);
  return { storyVotes, currentVote };
}
