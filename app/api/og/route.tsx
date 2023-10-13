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
  const postTitle = searchParams.get('title');
  const postPublishedAt = searchParams.get('publishedAt');
  
  const fontData = await fetch(
    new URL('../../../public/fonts/HubotSans-Medium.ttf', import.meta.url),
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
            marginLeft: 120,
            marginRight: 120,
            display: 'flex',
            fontSize: 86,
            fontFamily: 'Hubot',
            fontStyle: 'normal',
            color: 'white',
            whiteSpace: 'pre-wrap',
          }}
        >
          {postTitle}
        </div>
        <div
          style={{
            marginLeft: 120,
            marginRight: 120,
            marginBottom: 120,
            marginTop: 46,
            display: 'flex',
            fontSize: 46,
            fontFamily: 'Hubot',
            fontStyle: 'normal',
            color: '#94a3b8',
            whiteSpace: 'pre-wrap',
          }}
        >
          smartido.dev · {formatDate(postPublishedAt as string)}
        </div>
      </div>
    ),
    {
      width: 1900,
      height: 997,
      fonts: [
        {
          name: 'Hubot',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}