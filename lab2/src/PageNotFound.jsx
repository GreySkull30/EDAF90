import { useRouteError } from "react-router-dom";

function PageNotFound() {
  //const error = useRouteError();
  //console.error(error);

  return (
    <div id="error-page">
      <h1>Oops! Page not Found</h1>
      <p>Sorry, an unexpected error has occurred.
      </p>

    </div>
  );
}
export default PageNotFound;