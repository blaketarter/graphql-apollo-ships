import type { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { ALL_SHIPS_QUERY, ShipList } from '../components/ShipList'
import styles from '../styles/Home.module.css'
import { addApolloState, initializeApollo } from '../utils/apollo'

const SpaceX: NextPage<{ name: string }> = ({ name }: { name: string }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX Ships</title>
        <meta name="description" content="About SpaceX" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>SpaceX Ships</h1>
        <ShipList name={name} />
      </main>
    </div>
  )
}

export async function getServerSideProps(props: GetServerSidePropsContext) {
  const apolloClient = initializeApollo()

  const name = props.query?.name ?? ""

  await apolloClient.query({
    query: ALL_SHIPS_QUERY,
    variables: { name }
  })

  return addApolloState(apolloClient, {
    props: { name },
  })
}

export default SpaceX
