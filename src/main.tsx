import { Suspense } from "react";
import ReactDOM from "react-dom/client";
// i18n (needs to be bundled)
import "./i18n";
// Router
import { RouterProvider } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store/index";
import { QueryProvider } from "./providers/query.provider";
import { router } from "./routes/routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Suspense>
    <Provider store={store}>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </Provider>
  </Suspense>
);
