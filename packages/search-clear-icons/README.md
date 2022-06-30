### `Please Always read the interfaces files if any of current package to see it's properties`.

## Description:

```sh
  React component to render a search and clear icons as buttons.
```

# 🔨 Usage Examples

```typescript
import React, { useCallback } from "react";
import SearchClearIcons from "@exsys-patient-insurance/search-clear-icons";

const MyComponent = () => {
  const onPressClear = useCallback(() => {
    // do some clear related logic
  }, []);

  const onPressSearch = useCallback(() => {
    // do some search related logic
  }, []);

  return (
    <>
      <SearchClearIcons disabled />

      <SearchClearIcons
        onPressSearch={onPressSearch}
        onPressClear={onPressClear}
      />
    </>
  );
};
```
