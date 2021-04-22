import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';

import styles from '../styles/Home.module.scss';

function Home() {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.container}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>

          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the articles <br />
            <span>for $9.90/month</span>
          </p>

          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  );
}

export default Home;
