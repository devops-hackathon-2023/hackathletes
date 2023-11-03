import { useRouter } from 'next/router';

export default function About() {
  const router = useRouter();
  const { sasId } = router.query;

  return (
    <>
      <h1>Dashboard</h1>
      <h2>sasID: {sasId}</h2>
    </>
  );
}
