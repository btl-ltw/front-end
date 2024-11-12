// src/app/components/NovelList.tsx
import Link from 'next/link';

const novels = [
  { id: 1, title: 'Novel One', description: 'This is the first novel.' },
  { id: 2, title: 'Novel Two', description: 'This is the second novel.' },
  { id: 3, title: 'Novel Three', description: 'This is the third novel.' },
];

function NovelList() {
  return (
    <div className="novel-list">
      {novels.map((novel) => (
        <div key={novel.id} className="novel-item">
          <Link href={`/novel/${novel.id}`}>
            <h2>{novel.title}</h2>
            <p>{novel.description}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default NovelList;