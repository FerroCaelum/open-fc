import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className="text-3xl font-bold underline">
        <Link href="/notes">Go To Notes</Link>
      </div>
    </main>
  );
}
