'use client';
import { useRouter } from 'next/navigation';
import 'leaflet/dist/leaflet.css';
import EventTagManager from './rate';
export default function Home() {
  const router = useRouter();

  return (
    <div>
      <div >
        <h1>Rate A PitStop</h1>
        <p>Rate the pit stops from your road trip</p>
        <EventTagManager/>
        
      </div>
    </div>
  );
}



