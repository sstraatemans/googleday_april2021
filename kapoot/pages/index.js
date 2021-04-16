import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Choose a game</h1>
        <a href="/hoofdsteden-van-de-wereld">Hoofdsteden</a>
      </main>
    </div>
  )
}
