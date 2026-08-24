import NetInfo from "@react-native-community/netinfo";
import { onlineManager, QueryCache, QueryClient } from "@tanstack/react-query";

onlineManager.setEventListener((setOnline) =>
  NetInfo.addEventListener((state) => setOnline(Boolean(state.isConnected))),
);

/** Shared client for server state across native domain packages. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 24 * 60 * 60 * 1000,
      retry: 2,
      staleTime: 60 * 1000,
    },
  },
  queryCache: new QueryCache({
    onError(error) {
      console.error("[query-client]", error);
    },
  }),
});
