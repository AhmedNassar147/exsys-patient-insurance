### `Please Always read the interfaces files if any of current package to see it's properties`.

## Description:

```sh
  React component to render a menu item.
```

# 🔨 Usage Examples

```typescript
import MenuItem from "@exsys-clinio/menu-item";
import { colors } from "@exsys-clinio/theme-values";

const { someColor } = colors;

const MyComponent = () => {

const selected = some condition to return true | false;
const disabled = some condition to return true | false;

  return (
    <MenuItem
      disabled={disabled}
      selected={selected}
      selectedColor={someColor}
      height={your height}
      padding={your padding}
      onClick={your click handler here}
    >
      your children here
    </MenuItem>
  );
};
```
