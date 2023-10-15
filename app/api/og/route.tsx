import { ImageResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

function formatDate(date: string) {
  const targetDate = new Date(date);

  const fullDate = targetDate.toLocaleString('ca-es', {
    month: 'short',
    year: 'numeric',
  });

  return `${fullDate}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const title = searchParams.get('title');
  const publishedAt = searchParams.get('publishedAt') as string;
  
  const fontData = await fetch(
    new URL('../../../public/fonts/Hubot-Sans-Medium.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundImage: 'url(https://smartido.dev/og.png)',
        }}
      >
        <div
          style={{
            marginBottom: 120,
            marginLeft: 120,
            marginRight: 120,
            display: 'flex',
            flexDirection: 'column',
            fontSize: 86,
            fontFamily: 'Hubot-Sans',
            color: 'white',
          }}
        >
          <h1>{title}</h1>
          <div
            style={{
              display: 'flex',
              fontSize: 46,
              color: '#94a3b8',
            }}
          >
            smartido.dev · {formatDate(publishedAt)}
          </div>
        </div>
      </div>
    ),
    {
      width: 1900,
      height: 997,
      fonts: [
        {
          name: 'Hubot-Sans',
          data: fontData,
        },
      ],
    }
  );
}