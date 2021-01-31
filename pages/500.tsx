import Meta from '@/components/Meta';

const ServerErrorPage = () => {
  return (
    <>
      <Meta
        title="500"
        description="Internal Server Error."
        url="/"
      />

      <h1>500 - Internal Server Error</h1>

      <p>
        Uh-oh! Something bad happened on the server-side and we couldn't process
        your request. Please try again later.
      </p>
    </>
  );
};

export default ServerErrorPage;
