/*
 *
 * Package: `@exsys-clinio/async-awaiter`.
 *
 */
import { useMemo } from "react";
import LoadingIcon from "@exsys-clinio/loading-icon";
import Flex from "@exsys-clinio/flex";
import { Text } from "./styled";
import IProps from "./index.interface";

const AsyncAwaiter = ({
  height,
  children,
  loading,
  noData,
  noDataText,
  setWrapperAsColumn,
  wrapperProps,
  noWrapper,
  margin,
}: IProps) => {
  const component = useMemo(() => {
    if (loading) {
      return <LoadingIcon />;
    }
    if (noData) {
      return <Text children={noDataText || "ndt"} />;
    }
    return children;
  }, [children, loading, noData, noDataText]);

  if (noWrapper) {
    return <>{component}</>;
  }

  return (
    <Flex
      height={height || "100%"}
      width="100%"
      justify="center"
      align="center"
      column={setWrapperAsColumn ? "true" : ""}
      margin={margin}
      {...wrapperProps}
    >
      {component}
    </Flex>
  );
};

export default AsyncAwaiter;
