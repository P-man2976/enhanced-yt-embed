import 'react-contexify/dist/ReactContexify.css';
import './index.css';
import '@fontsource/inter';
import '@fontsource/noto-sans-jp';
import '@fontsource/outfit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DevTools } from 'jotai-devtools';
import ContextMenu, {
  ctxMenuID,
  queueMenuID,
} from './components/common/ContextMenu';
import Home from './pages/Home';
import Toast from './components/common/Toast';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/common/ErrorFallback';
import { SidebarDrawer } from './components/layout/Sidebar';
import PageContainer from './components/layout/PageContainer';

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
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <PageContainer>
          {/* <ReactQueryDevtools /> */}
          <DevTools />
          <ContextMenu menuId={ctxMenuID} />
          <ContextMenu menuId={queueMenuID} />
          <Home />
          <SidebarDrawer />
          <Toast />
        </PageContainer>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
