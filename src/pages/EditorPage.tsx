import { useSearchParams } from 'react-router-dom';
import CardEditor from '../components/editor/CardEditor';

export default function EditorPage() {
  const [searchParams] = useSearchParams();
  const layoutId = searchParams.get('layout') ?? undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <CardEditor initialFrontLayoutId={layoutId} />
    </div>
  );
}
