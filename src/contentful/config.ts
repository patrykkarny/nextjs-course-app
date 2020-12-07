import get from 'lodash/get';
import has from 'lodash/has';
import isPlainObject from 'lodash/isPlainObject';

import { createClient } from 'contentful';

import { contentfulEntryIds } from 'src/contentful/consts';

const { isArray } = Array;
const { entries } = Object;
const { isInteger } = Number;

const isString = (prop: string) => typeof prop === 'string';
const isBoolean = (prop: boolean) => typeof prop === 'boolean';
const isUrl = (prop: any) => has(prop, 'fields.file.url');
const getUrl = (prop: any) => get(prop, 'fields.file.url');

const extractFields = (object: any) =>
  has(object, 'fields') ? { ...object.fields } : { ...object };

const normalizeEntriesValues = (values: any) =>
  entries(extractFields(values)).reduce((normalized, [key, value]: any) => {
    if (isString(value) || isInteger(value) || isBoolean(value)) {
      normalized[key] = value;
      return normalized;
    }

    if (isArray(value)) {
      normalized[key] = normalizeEntries(value);
      return normalized;
    }

    if (isUrl(value)) {
      normalized[key] = getUrl(value);
      return normalized;
    }

    if (isPlainObject(value)) {
      normalized[key] = normalizeEntriesValues(extractFields(value));
      return normalized;
    }

    return normalized;
  }, {} as any);

export const normalizeEntries = <T>(data: any): T =>
  data.map((item: any) => {
    if (isString(item) || isInteger(item)) return item;
    if (isUrl(item)) return getUrl(item);

    const mappedItem = extractFields(item);

    return normalizeEntriesValues(mappedItem);
  });

export const contentfulClient = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  space: process.env.CONTENTFUL_SPACE_ID!,
});

export const getEntries = async <T>(
  entryId: contentfulEntryIds,
  selectors?: { [key: string]: string },
): Promise<T> => {
  const { items } = await contentfulClient.getEntries({
    content_type: entryId,
    include: 5,
    ...selectors,
  });
  const normalizedData = normalizeEntries<T>(items);

  return normalizedData;
};
