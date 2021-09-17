import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import React from "react";
import { useDebouncedCallback } from "../../utils/useDebouceCallback";
import styles from "./styles.module.css";

export const ALL_SHIPS_QUERY = gql`
  query allShips($name: String!) {
    ships(find: { name: $name }) {
      name
      url
      image
      id
    }
  }
`
export type Ship = {
  id: string
  name: string
  image: string
  url: string
}

export function ShipList({ name = "" }: { name?: string }) {
  const router = useRouter()
  const defaultName = router.query?.name ?? name
  const { loading, error, data, refetch } = useQuery<{ ships: Ship[] }>(
    ALL_SHIPS_QUERY,
    { variables: { name: defaultName } }
  )

  const searchShips = useDebouncedCallback((e) => {
    router.replace({ query:{ name: e.target.value } })
    refetch({
      name: e.target.value
    })
  }, 300)

  if (error) {
    console.error(error);
  }

  return (
    <>
      <input defaultValue={defaultName} className={styles.input} onChange={searchShips} type="text" placeholder="Search for a ship" />
      <div className={styles.container}>
        {loading ? <div>Loading...</div> : !data?.ships?.length ? <div>No Ships Found</div> : data?.ships.map((ship) => (
          <a key={ship.id} href={ship.url} target="_blank" className={styles.link} rel="noopener noreferrer">
            <div className={styles.ship}>
            {ship.image ? (
              <Image className={styles.shipImage} src={ship.image} alt={`Image of ${ship.name}`} layout="responsive" height={100} width={100} />
              ) : <div className={styles.empty} />}
              <p className={styles.shipName}>{ship.name}</p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
