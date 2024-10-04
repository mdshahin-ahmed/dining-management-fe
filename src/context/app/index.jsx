import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { AuthProvider } from "./auth-context";
import { BrowserRouter as Router } from "react-router-dom";
import AsToast from "../../components/common/AsToast";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { removeDoubleQuotes } from "../../utils/helper";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";

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

function AppProviders({ children }) {
  return (
    <Router basename="/asfood">
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <div>
                  <h1 onClick={() => resetErrorBoundary}>
                    Error page something went wrong from context/app/index
                  </h1>
                  {/* <ErrorPage
                    heading="500 -  Internal server error"
                    subheader="Opps, something went wrong! The server encountered an internal error and was not able to complete request"
                    onClick={resetErrorBoundary}
                  /> */}
                </div>
              )}
            >
              <AuthProvider>{children}</AuthProvider>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryClientProvider>
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
    </Router>
  );
}
export { AppProviders };
