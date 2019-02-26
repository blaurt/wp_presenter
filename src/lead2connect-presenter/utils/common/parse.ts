import { parse } from 'query-string';

export const parseQueryParams = (): { [k: string]: any } => {
  const url = location.href;
  const matchResult = url.match(/\?.*/);
  if (matchResult) {
    return parse(matchResult[0])
  }
  return {};
}