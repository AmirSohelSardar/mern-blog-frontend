import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      
      console.log('🔵 Google user data:', {
        displayName: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        photoURL: resultsFromGoogle.user.photoURL
      });
      
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: resultsFromGoogle.user.displayName,
            email: resultsFromGoogle.user.email,
            googlePhotoUrl: resultsFromGoogle.user.photoURL,
          }),
        }
      );
      
      const data = await res.json();
      
      console.log('🟢 Backend response:', data);
      
      if (res.ok) {
        // Ensure profilePicture is set in the dispatched data
        const userData = {
          ...data,
          profilePicture: data.profilePicture || data.profile_picture || resultsFromGoogle.user.photoURL
        };
        
        console.log('🟣 Dispatching user data to Redux:', userData);
        dispatch(signInSuccess(userData));
        navigate('/');
      } else {
        console.error('❌ Backend error:', data);
        alert('Sign-in failed: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('❌ Google sign-in error:', error);
      alert('Sign-in failed: ' + error.message);
    }
  };
  
  return (
    <Button
      type='button'
      gradientDuoTone='pinkToOrange'
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className='w-6 h-6 mr-2' />
      Continue with Google
    </Button>
  );
}