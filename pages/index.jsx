import React from 'react';
import { getEntries } from 'src/contentful/config';
import {
  contentfulEntryIds,
  contentfulSelectorKeys,
} from 'src/contentful/consts';

const Home = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

export default Home;

export async function getStaticProps() {
  const data = await getEntries(contentfulEntryIds.DYNAMIC_ROUTE_ENTRY_ID, {
    [contentfulSelectorKeys.FIELDS_PATH]: '/',
  });

  return {
    props: { data: data[0] },
  };
}
