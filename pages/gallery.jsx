/** @jsx jsx */
import { jsx } from 'theme-ui';

const Gallery = ({ content }) => (
  <div sx={{ height: `calc(100vh - 60px)` }}>
    <div
      sx={{
        variant: 'containers.page',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <h1 sx={{ fontSize: 8, my: 0 }}>{content.title}</h1>
    </div>
  </div>
);

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
