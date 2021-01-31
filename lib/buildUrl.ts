const buildUrl = (path: string = ''): string => {
  const portWithColon = process.env.PORT
    ? `:${process.env.PORT}`
    : '';

  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.host}`
    : `${process.env.PROTOCOL}://${process.env.DOMAIN}${portWithColon}`;

  const pathWithSlash = path[0] === '/'
    ? path
    : `/${path}`;

  return `${baseUrl}${pathWithSlash}`;
};

export default buildUrl;
