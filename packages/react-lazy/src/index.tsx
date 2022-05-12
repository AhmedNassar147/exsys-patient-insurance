/*
 *
 * Package: `@exsys-clinio/react-lazy`.
 *
 */
import {
  FunctionComponent,
  MemoExoticComponent,
  ForwardRefRenderFunction,
  forwardRef,
  Suspense,
  lazy,
} from "react";
import IProps from "./index.interface";

const DEFAULT_FALLBACK = null;

const createLazyLoadedComponent = <P extends any>(
  importFunction: () => Promise<{
    default:
      | FunctionComponent<P>
      | ForwardRefRenderFunction<any, P>
      | MemoExoticComponent<(props: P, ref: any) => JSX.Element>;
  }>
) => {
  const LazyLoadedComponent = lazy(importFunction);

  const LazyComponent = (
    { fallback, shouldMountChunk, ...props }: IProps,
    ref: any
  ) => (
    <Suspense fallback={fallback || DEFAULT_FALLBACK}>
      {shouldMountChunk && (
        <LazyLoadedComponent
          {...props}
          // @ts-ignore
          ref={ref}
        />
      )}
    </Suspense>
  );

  return forwardRef(LazyComponent);
};

export default createLazyLoadedComponent;
