import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserSearch from "./components/UserSearch";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <div className="app-container">
      <h1>🔍 GitHub User Search</h1>
      <UserSearch />
    </div>
  </QueryClientProvider>
);

export default App;
