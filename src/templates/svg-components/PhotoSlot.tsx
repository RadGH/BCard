import type { Region } from '../../types/template';
import { resolvePublicUrl } from '../../lib/public-url';

interface Props {
  src?: string;
  region: Region;
  clipShape?: 'rect' | 'circle' | 'rounded';
}

export default function PhotoSlot({ src, region, clipShape = 'rect' }: Props) {
  if (!src) return null;

  // Use a stable unique ID based on position so multiple slots don't collide
  const clipId = `portrait-clip-${Math.round(region.x * 10)}-${Math.round(region.y * 10)}`;
  const cx = region.x + region.width / 2;
  const cy = region.y + region.height / 2;
  const r = Math.min(region.width, region.height) / 2;
  const rx = clipShape === 'rounded' ? 2 : 0;

  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          {clipShape === 'circle' ? (
            <circle cx={cx} cy={cy} r={r} />
          ) : (
            <rect x={region.x} y={region.y} width={region.width} height={region.height} rx={rx} />
          )}
        </clipPath>
      </defs>
      <image
        href={resolvePublicUrl(src)}
        x={region.x}
        y={region.y}
        width={region.width}
        height={region.height}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clipId})`}
      />
    </g>
  );
}
