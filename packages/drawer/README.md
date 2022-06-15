### `Please Always read the interfaces files if any of current package to see it's properties`.

## Description:

```sh
  React component to render a drawer.
```

# 🔨 Usage Examples

### NOTE, setting the `placement` to value like `left | right` means

you don't want the drawer to respect the current app direction. if you leave the
placement to the drawer it will respect the current app direction meaning if the
app dir="rtl" the drawer rendered on the right side and vise-versa.

```typescript
import Drawer from "@exsys-patient-insurance/drawer";

const MyComponent = () => {
  return (
    <Drawer
      visible={your visible state}
      onClose={your close fn}
      placement="left | right | levar it to the drawer logic"
      ...other props please check the the index.interface.ts file

    >
    // yor content
    </Drawer>
  );
};
```
