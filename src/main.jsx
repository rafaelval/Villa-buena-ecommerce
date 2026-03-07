import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { QueryProvider } from "./app/providers/QueryProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

const onRedirectCallback = (appState) => {
  router.navigate(appState?.returnTo ?? window.location.pathname);
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryProvider>
    <Auth0Provider
      domain="dev-rafaelval.us.auth0.com"
      clientId="ripKJ8Jjq1c3gLEOcusOGUTBTFVGoVdG"
      authorizationParams={{ redirect_uri: window.location.origin }}
      onRedirectCallback={onRedirectCallback}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </QueryProvider>,
);