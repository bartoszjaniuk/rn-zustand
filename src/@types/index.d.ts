type Nullable<T> = T | null;

type DeepNullable<T> = {
  [K in keyof T]: DeepNullable<T[K]> | null;
};

type Route<X = unknown> = string & {
  readonly _1: X;
  readonly TAG: "Route";
};

type RouteParams<T> = T extends Route<infer P> ? P : never;
type UnpackArray<T> = T extends ReadonlyArray<infer K> ? UnpackArray<K> : T;

type ErrorModalRequestMeta<TError = unknown> = {
  errorModalDescription: string | ((error: TError) => string);
  locale: string;
};

declare type RouteMetaParams = {
  meta: {
    presentation: import("react-native-screens").StackPresentationTypes;
  };
};
