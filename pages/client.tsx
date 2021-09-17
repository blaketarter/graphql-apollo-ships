import type { NextPage } from 'next'
import Head from 'next/head'
import { ShipList } from '../components/ShipList'
import styles from '../styles/Home.module.css'

const SpaceX: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX Ships</title>
        <meta name="description" content="About SpaceX" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>SpaceX Ships</h1>
        <ShipList />
      </main>
    </div>
  )
}

export default SpaceX
