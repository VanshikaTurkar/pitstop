'use client';
import { useRouter } from 'next/navigation';
import PitStop from "./finder.js";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <div>
        <h1>Find PitStops</h1>
        <p>Find the best pit stops on your next road trip</p>
        <PitStop />
      </div>
    </div>
  );
}

