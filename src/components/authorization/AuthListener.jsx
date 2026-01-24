import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../../store/authSlice";

export default function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user ? { uid: user.uid, email: user.email } : null));
      dispatch(setLoading(false));
    });

    return () => unsub();
  }, [dispatch]);

  return null;
}
