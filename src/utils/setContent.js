import Skeleton from "../components/skeleton/Skeleton";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Spinner from "../components/spinner/Spinner";

export const setContent = (process, Component, data) => {
  switch (process) {
    case "waiting":
      return <Skeleton />;
    case "loading":
      return <Spinner />;
    case "confirmed":
      return <Component data={data} />;
    case "error":
      return <ErrorMessage />;
    default:
      return new Error("Unexpected process case");
  }
};

export const setContentWithPagination = (
  process,
  Component,
  newListLoading
) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return newListLoading ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />;
    case "error":
      return <ErrorMessage />;
    default:
      return new Error("Unexpected process case");
  }
};
