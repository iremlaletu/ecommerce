const ErrorPage = () => {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        textAlign: "center",
      }}
    >
      <h4>Oops! Something went wrong</h4>
      <h4>
        The page you're looking for might have been moved or doesn't exist
        anymore.
      </h4>
      <h4> return to the Home Page, Click "e-commerce" </h4>
    </main>
  );
};

export default ErrorPage;
