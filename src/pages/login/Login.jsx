import styles from "./LoginPage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Input from "../../components/input/Input";


export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate("/order");
    } catch (e) {
      setErr(e.message);
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
          onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPass(e.target.value)}
            labelClass={styles.label}
            inputClass={styles.input}
          />
        </div>

        {err && <p className={styles.error}>{err}</p>}

        <div className={styles.actions}>
          <button className={styles.submit} type="submit">Submit</button>
          <button className={styles.cancel} type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
