/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment, useState } from 'react';
import Image from 'next/image';

const images = [
  {
    url:
      'https://images.ctfassets.net/q9rxrblsu2zi/2wWFy45IfcnQGM8bJd9kHi/6d6f882a1c7e2d9afd16d70bf4e1e16b/HappyProjects-KellySung_2x.png',
  },
  {
    url:
      'https://images.ctfassets.net/q9rxrblsu2zi/Us6nJG7Cnwpg71zMpa3b8/a8fc9623dbb3eba871bde902760d0e4a/Rectangle_146.png',
  },
  {
    url:
      'https://images.ctfassets.net/q9rxrblsu2zi/5CkzhbnLbdNKXHENwJ8Ott/8404f09e397abf73e5eeec4fbdeaf207/Rectangle_1493x.png',
  },
  {
    url:
      'https://images.ctfassets.net/q9rxrblsu2zi/GIK2VuyFvrjinXcs9fdOC/4f1329287f7c43865c193fb50dba5b92/Rectangle_763x.png',
  },
  {
    url:
      'https://images.ctfassets.net/q9rxrblsu2zi/C9dX7bApEXOo573K2vd0S/baefcb1c385d4f27450b7da22d555c48/d_designscope_hero_3x.jpg',
  },
];

const defaultValues = images.reduce(
  (values, img, i) => ({
    ...values,
    [i]: {
      slow: `Loading...`,
      fast: 'Loading...',
    },
  }),
  {},
);

const Gallery = ({ content }) => {
  const [fileSizes, setFileSizes] = useState(defaultValues);

  const handleOnLoad = (type, index) => async ({ currentTarget }) => {
    const { currentSrc, src } = currentTarget;
    const file = performance.getEntriesByName(currentSrc || src)[0];

    const size = await fetch(currentSrc).then((b) =>
      b.headers.get('content-length'),
    );

    if (!file) return;

    const fileSize = file.transferSize || size || 0;

    setFileSizes((sizes) => ({
      ...sizes,
      [index]: {
        ...sizes[index],
        [type]: `Size: ${parseFloat(fileSize / 1024).toFixed(2)}kB`,
      },
    }));
  };

  return (
    <div sx={{ height: `calc(100vh - 60px)` }}>
      <div
        sx={{
          variant: 'containers.page',
          display: 'flex',
          alignItems: 'top',
          flexDirection: 'column',
        }}
      >
        <h1 sx={{ fontSize: 8, my: 0, mb: 50 }}>{content.title}</h1>
        <div
          sx={{
            display: 'grid',
            gridTemplate: 'auto / 1fr 1fr',
            gap: '20px',
          }}
        >
          {images.map(({ url }, i) => (
            <Fragment key={i}>
              <Image
                src={url}
                objectFit="cover"
                width={600}
                height={600}
                layout="responsive"
                onLoad={handleOnLoad('fast', i)}
              />

              <img
                src={url}
                alt=""
                onLoad={handleOnLoad('slow', i)}
                sx={{
                  display: 'block',
                  maxWidth: '100%',
                  objectFit: 'cover',
                }}
              />
              <h3 sx={{ textAlign: 'center' }}>{fileSizes[i].fast}</h3>
              <h3 sx={{ textAlign: 'center' }}>{fileSizes[i].slow}</h3>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;

export async function getStaticProps() {
  return {
    props: {
      content: {
        title: 'Gallery page',
      },
    },
  };
}
