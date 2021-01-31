import Meta from '@/components/Meta';

const NotFoundPage = () => {
  return (
    <>
      <Meta
        title="404"
        description="Page not found."
        url="/"
      />

      <h1>404 - Page Not Found</h1>

      <p>
        Bummer. The page you have requested could not be found.
      </p>
    </>
  );
};

export default NotFoundPage;
