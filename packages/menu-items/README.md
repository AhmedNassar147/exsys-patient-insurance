### `Please Always read the interfaces files if any of current package to see it's properties`.

## Description:

```sh
  React component to render menu items.
```

# 🔨 Usage Examples

```typescript
import { useCallback } from "react";
import MenuItems, {
  MenuItemsChangeEvent,
} from "@exsys-patient-insurance/menu-items";

const options = [
  {
    key: "key",
    value: "value",
  },
  {
    key: "key2",
    value: "value2",
  },
  {
    key: "key3",
    value: "value3",
  }
]

const MyComponent = () => {
  const onMenuItemsChanged: MenuItemsChangeEvent = useCallback(
    ({ selectedKeysOrKey, currentSelectedItem }) => {
      // do some logic
    },
    []
  );

  return (
    <>
      <MenuItems
        mode="multiple"
        dataSource={options}
        disabledKeys={undefined || array of keys}
        selectedKeys={undefined || array of keys}
        onChange={onMenuItemsChanged}
        maxHeight="220px"
      />

      <MenuItems
        dataSource={options}
        disabledKeys={undefined || key as string or number}
        selectedKeys={undefined || key as string or number}
        onChange={onMenuItemsChanged}
        maxHeight="250px"
      />

      <MenuItems
        dataSource={options}
        disabledKeys={undefined || key as string or number}
        selectedKeys={undefined || key as string or number}
        onChange={onMenuItemsChanged}
        maxHeight="280px"
        // to make the list scrolls to given value
        firstActiveValue="value3"
      />
    </>
  );
};
```
