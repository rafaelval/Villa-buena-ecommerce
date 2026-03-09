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
      domain={import.meta.env.VITE_API_DOMAIN}
      clientId={import.meta.env.VITE_API_CLIENTID}
      authorizationParams={{ redirect_uri: window.location.origin }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </QueryProvider>,
);
