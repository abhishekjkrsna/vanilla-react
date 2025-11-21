import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LoggedInContext, PageNumberContext } from "./context/Context";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  basepath: "/vanilla-react",
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const loggedInContextValue = useMemo(() => {
    return { loggedIn, setLoggedIn };
  }, [loggedIn]);

  const PageNumberContextValue = useMemo(() => {
    return { pageNum, setPageNum };
  }, [pageNum]);

  return (
    <LoggedInContext.Provider value={loggedInContextValue}>
      <PageNumberContext.Provider value={PageNumberContextValue}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PageNumberContext.Provider>
    </LoggedInContext.Provider>
  );
}

export default App;
