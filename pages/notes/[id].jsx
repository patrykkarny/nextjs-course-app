/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useRouter } from 'next/router';

const Note = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div sx={{ variant: 'containers.page' }}>
      <h1>Note: {id} </h1>
    </div>
  );
};

export default Note;

export async function getServerSideProps({ params, req, res }) {
  const response = await fetch(`${process.env.API_URL}/api/note/${params.id}`);
  const { data } = await response.json();

  if (!data) {
    return {
      redirect: {
        destination: '/notes',
        permanent: false,
      },
    };
  }

  return {
    props: { note: data },
  };
}
