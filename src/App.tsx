import "react-contexify/dist/ReactContexify.css";
import "./index.css";
import "@fontsource/inter";
import "@fontsource/noto-sans-jp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ContextMenu, { ctxMenuID, queueMenuID } from "./components/common/ContextMenu";
import Home from "./pages/Home";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			staleTime: 1000 * 60 * 30,
		},
	},
});

function App() {

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			<ContextMenu menuId={ctxMenuID} />
			<ContextMenu menuId={queueMenuID} />
			<Home />
		</QueryClientProvider>
	);
}

export default App;
