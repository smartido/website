import { ImageResponse, NextRequest } from 'next/server';
import { formatDate } from 'app/utils';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const title = searchParams.get('title');
  const publishedAt = searchParams.get('publishedAt') as string;

  const fontDataBold = await fetch(
    new URL('../../../public/fonts/Mona-Sans-Bold.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  const fontDataMedium = await fetch(
    new URL('../../../public/fonts/Mona-Sans-Medium.ttf', import.meta.url),
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
          backgroundImage: 'url(https://smartido.dev/og-bg.png)',
        }}
      >
        <div
          style={{
            marginBottom: 150,
            marginLeft: 150,
            marginRight: 150,
            display: 'flex',
            flexDirection: 'column',
            fontSize: 120,
            fontFamily: 'Mona-Sans-Bold',
            color: 'white',
          }}
        >
          <h1>{title}</h1>
          <div
            style={{
              display: 'flex',
              fontSize: 60,
              fontFamily: 'Mona-Sans-Medium',
            }}
          >
            smartido.dev · {formatDate(publishedAt)}
          </div>
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: 'Mona-Sans-Bold',
          data: fontDataBold,
          style: 'normal'
        },
        {
          name: 'Mona-Sans-Medium',
          data: fontDataMedium,
          style: 'normal'
        },
      ],
    }
  );
}