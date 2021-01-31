import Meta from '@/components/Meta';
import shuffle from '@/lib/shuffle';
import { useEffect, useState } from 'react';

const CustomizationPage = () => {
  const [ links, setLinks ] = useState([
    'https://www.youtube.com/watch?v=RF1rFSoN3JQ', // Big Giant Circles - Go for Distance
    'https://www.youtube.com/watch?v=HQmT8At9G4Y', // Kubbi - Overworld
    'https://www.youtube.com/watch?v=pFgUluV_00s', // Shirakami Fubuki - Say! Fanfare
    'https://www.youtube.com/watch?v=BRwBa4ahWqM', // Owl City - Hot Air Balloon
    'https://www.youtube.com/watch?v=r0P67hLrFHI', // Princewhateverer - Miscommunication
    'https://www.youtube.com/watch?v=lByhGkbRGGo', // Anamanaguchi - Space Wax America
    'https://www.youtube.com/watch?v=viOuwj31JaQ', // Benickerson - Coming Together
    'https://www.youtube.com/watch?v=FjjBHY7sZo4', // Fort Minor - In Stereo
    'https://www.youtube.com/watch?v=hUEvfuv0haA', // t+pazolite - Funny Function
    'https://www.youtube.com/watch?v=mco3UX9SqDA', // Hatsune Miku - Po Pi Po
    'https://www.youtube.com/watch?v=qPbA0mMGsSg', // Aimer - Brave Shine
    'https://www.youtube.com/watch?v=KEnLyp8Nock', // Owl City - Cinematic
    'https://www.youtube.com/watch?v=ULqdjtDI-bs', // Seven Lions - Worlds Apart
    'https://www.youtube.com/watch?v=6--MBZKVxT8', // chipzel - Forged in Stars
    'https://www.youtube.com/watch?v=S8MjTxWBoC8', // All Levels at Once - Phoenix
    'https://www.youtube.com/watch?v=NF-bCSAeJgI', // The Microphones - Map
    'https://www.youtube.com/watch?v=9TpPFaz1hhI', // chibi-tech - Moe Moe Kyunstep
    'https://www.youtube.com/watch?v=NHZr6P1csiY', // bill wurtz - and the day goes on
    'https://www.youtube.com/watch?v=C8D_tsp3gzs', // Cave Story - Jenka 2
    'https://www.youtube.com/watch?v=12TimqCw39s', // OneShot - On Little Cat Feet
    'https://www.youtube.com/watch?v=QwdbFNGCkLw', // Ievan Polkka (VSNS Remix) Nightcore
    'https://www.youtube.com/watch?v=B7xai5u_tnk', // TheFatRat - Monody
    'https://www.youtube.com/watch?v=3H-ljfkVLYk', // BOSSFIGHT - Farbror Melker Fixar Fiskdamm
    'https://www.youtube.com/watch?v=slqaj0Wt4oM', // nanobii - HYPER★DRIVE
    'https://www.youtube.com/watch?v=xiZpYdmaThM'  // nanobii - Popsicle Beach
  ]);

  const randomize = () => {
    const copy = links.slice(0);
    shuffle(copy);
    setLinks(copy);
  };

  useEffect(randomize, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const increment = () => {
    setTimeout(() => {
      if (currentIndex === links.length - 1) {
        randomize();
        setCurrentIndex(0);
        return;
      }

      setCurrentIndex(idx => idx + 1);
    }, 500);
  };

  return (
    <>
      <Meta
        title="Customization"
        description="Learn how you can customize your self-hosted instance of Thimble Bot."
        url="/customization"
      />

      <h1>Thimble Bot Customization</h1>

      <p>
        This page is a work in progress! Please check back later 💛 In the
        meantime, you could listen to some&nbsp;
        <a
          href={links[currentIndex]}
          target="_blank"
          rel="noreferrer noopener"
          onClick={increment}
        >music</a>.
      </p>
    </>
  );
};

export default CustomizationPage;
