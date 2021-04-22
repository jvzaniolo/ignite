import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from '../styles/SignInButton.module.scss';

export function SignInButton() {
  const isLoggedIn = false;

  return isLoggedIn ? (
    <button type="button" className={styles.button}>
      <FaGithub color="#04d361" />
      João Vitor
      <FiX color="#737380" />
    </button>
  ) : (
    <button type="button" className={styles.button}>
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
