const useQueryHelper = () => {
  const addQueryParamInURL = ({
    param,
    value,
  }: {
    param: string;
    value: string | undefined;
  }) => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);

    if (value === undefined || value === "") {
      removeQueryParamFromURL(param);
    } else {
      url.searchParams.set(param, value);
      window.history.replaceState({}, "", url.toString());
    }
  };

  const removeQueryParamFromURL = (param: string) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);

      url.searchParams.delete(param);

      window.history.pushState({}, "", url.toString());
    }
  };

  return { addQueryParamInURL, removeQueryParamFromURL };
};

export default useQueryHelper;
