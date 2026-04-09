import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardEditor from '../components/editor/CardEditor';

export default function EditorPage() {
  const [searchParams] = useSearchParams();
  const layoutId = searchParams.get('layout') ?? undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <h1 className="sr-only">Business Card Editor</h1>
      <CardEditor initialFrontLayoutId={layoutId} />
    </div>
  );
}
