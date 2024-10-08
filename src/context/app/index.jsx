import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { AuthProvider } from "./auth-context";
import AsToast from "../../components/common/AsToast";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { removeDoubleQuotes } from "../../utils/helper";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../../components/common/ErrorPage";
import { BrowserRouter } from "react-router-dom";

const mutationCache = new MutationCache({
  onError(error, variables, context, mutation) {
    if (mutation.options.fromAuth) {
      return AsToast.error(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>{removeDoubleQuotes(error.message)}</span>
        </div>
      );
    }
    AsToast.error(
      <div className="errorToast">
        <AiOutlineCheckCircle /> &nbsp;
        <span>{removeDoubleQuotes(error.message)}</span>
      </div>
    );
  },
});

const queryCache = new QueryCache({
  onError(error) {
    AsToast.error(
      <div className="errorToast">
        <AiOutlineCheckCircle /> &nbsp;
        <span>{removeDoubleQuotes(error.message)}</span>
      </div>
    );
  },
});

const queryClient = new QueryClient({
  mutationCache,
  queryCache,
  defaultOptions: {
    queries: {
      useErrorBoundary: false,
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (error.statusCode === 404) return false;
        if (failureCount < 2) return true;
        return false;
      },
    },
  },
});

// const queryClient = new QueryClient();

function AppProviders({ children }) {
  console.log("App provider");
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <ErrorPage
                heading="500 -  Internal server error"
                subheader="Opps, something went wrong! The server encountered an internal error and was not able to complete request"
                onClick={resetErrorBoundary}
              />
            )}
          >
            <BrowserRouter>
              <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
              />
              <AuthProvider>{children}</AuthProvider>
            </BrowserRouter>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
}
export { AppProviders };
