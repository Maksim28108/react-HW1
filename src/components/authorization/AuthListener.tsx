import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { auth } from "../../firebase";
import { setUser } from "../../store/authSlice";

export default function AuthListener() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
          })
        );
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsub();
  }, [dispatch]);

  return null;
}
