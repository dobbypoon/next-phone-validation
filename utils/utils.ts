export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const lookupPhoneFetcher = async (
  url: string,
  { arg }: { arg: string },
) => fetch(`${url}/${arg}`).then((res) => res.json())
