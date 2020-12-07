import React from 'react';
import { useRouter } from 'next/router';

import { getEntries } from 'src/contentful/config';
import {
  contentfulEntryIds,
  contentfulSelectorKeys,
} from 'src/contentful/consts';

const Cms = ({ data }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Cms;

export async function getStaticPaths() {
  const routes = await getEntries(contentfulEntryIds.DYNAMIC_ROUTES_ENTRY_ID);

  const paths = routes[0].dynamicRoutes
    .map(({ path }) => ({
      params: { slug: path.split('/').filter(Boolean) },
    }))
    .filter((route) => !!route.params.slug.length);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const selectors = {
    [contentfulSelectorKeys.FIELDS_PATH]: `/${params.slug.join('/')}`,
  };

  const data = await getEntries<any>(
    contentfulEntryIds.DYNAMIC_ROUTE_ENTRY_ID,
    selectors,
  );

  console.log(data);

  if (!data.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: data[0] },
    revalidate: 1,
  };
}
