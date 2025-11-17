import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useState } from "react";
import { LoggedInContext, PageNumberContext } from "./context/Context";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  return (
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
      <PageNumberContext.Provider value={{ pageNum, setPageNum }}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider
            router={router}
            context={{
              auth: { loggedIn, setLoggedIn },
            }}
          />
        </QueryClientProvider>
      </PageNumberContext.Provider>
    </LoggedInContext.Provider>
  );
}

export default App;
