import { useEffect, useState } from "react";
import { callGraphQL } from "./callGraphQL";

const cache: Record<string, any> = {};

type FetchState<T> =
  | { status: "idle"; data: null; error: null }
  | { status: "loading"; data: null; error: null }
  | { status: "error"; data: null; error: Error }
  | { status: "success"; data: T; error: null };

export const useGraphQL = <TData, TVariables>({
  query,
  variables,
  useCache,
}: {
  query: string;
  variables: TVariables;
  useCache?: boolean;
}) => {
  const [state, setState] = useState<FetchState<TData>>({
    status: "idle",
    data: null,
    error: null,
  });

  const stringVariables = JSON.stringify(variables);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setState({ status: "loading", data: null, error: null });

      if (useCache && cache[stringVariables]) {
        setState({
          status: "success",
          data: cache[stringVariables] as TData,
          error: null,
        });
        return;
      }

      try {
        const result = await callGraphQL<TVariables>(query, variables);

        if (result.errors && result.errors.length > 0) {
          throw new Error(result.errors[0].message);
        }

        if (!result.data) {
          throw new Error("No data returned from GraphQL.");
        }

        cache[stringVariables] = result.data;

        if (!cancelled) {
          setState({ status: "success", data: result.data, error: null });
        }
      } catch (e) {
        const err = e instanceof Error ? e : new Error("Unknown GraphQL error");

        if (!cancelled) {
          setState({ status: "error", data: null, error: err });
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [query, JSON.stringify(variables)]);

  return state;
};
