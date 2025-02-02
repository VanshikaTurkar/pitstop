'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.imageContainer}>
        <h1>PitStops</h1>
        <p>Find and rate the best pit stops on your next road trip</p>
        <button onClick={() => router.push('/rate')}>Get Started</button>
        <button onClick={() => router.push('/search')}>Find a Pit Stop</button>
      </div>
    </div>
  );
}

