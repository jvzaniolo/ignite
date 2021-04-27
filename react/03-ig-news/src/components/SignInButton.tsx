import { FiX } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import { signIn, signOut, useSession } from 'next-auth/client';

import styles from '../styles/SignInButton.module.scss';

export function SignInButton() {
  const [session] = useSession();

  return session ? (
    <button className={styles.button}>
      <FaGithub color="#04d361" />
      {session.user.name}
      <button type="button" onClick={() => signOut()} title="Sign Out">
        <FiX />
      </button>
    </button>
  ) : (
    <button
      type="button"
      className={styles.button}
      onClick={() => signIn('github')}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
