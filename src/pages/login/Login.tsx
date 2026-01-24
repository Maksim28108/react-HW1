import styles from "./LoginPage.module.css";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate, useLocation, type Location } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

type LocationState = {
  from?: {
    pathname: string;
  };
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation() as Location & { state: LocationState };

  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [err, setErr] = useState<string>("");

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr("");

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate(from, { replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) setErr(error.message);
      else setErr("Login failed");
    }
  };

  const onCancel = () => {
    setEmail("");
    setPass("");
    setErr("");
  };

  return (
    <section className={styles.login}>
      <h1 className={styles.title}>Log in</h1>

      <form className={styles.card} onSubmit={onLogin}>
        <div className={styles.row}>
          <Input
            id="email"
            label="User name"
            type="email"
            value={email}
            placeholder="test@gmail.com"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            labelClass={styles.label}
            inputClass={styles.input}
          />
        </div>

        <div className={styles.row}>
          <Input
            id="password"
            label="Password"
            type="password"
            value={pass}
            placeholder="123456"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
            labelClass={styles.label}
            inputClass={styles.input}
          />
        </div>

        {err && <p className={styles.error}>{err}</p>}

        <div className={styles.actions}>
          <Button className={styles.submit} type="submit">
            Submit
          </Button>

          <Button className={styles.cancel} type="button" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
}
