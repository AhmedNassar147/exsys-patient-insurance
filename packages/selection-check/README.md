### `Please Always read the interfaces files if any of current package to see it's properties`.

## Description:

```sh
  React component to render a checkbox or radio input.
```

# 🔨 Usage Examples

## `Checkbox`

```typescript
import { useState } from "react";
import SelectionCheck from "@exsys-patient-insurance/selection-check";
import useFormManager from "@exsys-patient-insurance/form-manager";

const MyComponent = () => {
  const {
    values: { checkBox },
    handleChange
  } = useFormManager({
    initialValues: {
      checkBox: false
    }
  });

  return (
    <SelectionCheck
      checked={checkBox}
      name="checkBox"
      onChange={handleChange}
      label="some label"
    />

    <SelectionCheck
      checked={checkBox}
      name="checkBox"
      onChange={handleChange}
      label="some label"
      // this prop make the element takes the full width of it's parent
      block="true"
    />
  );
};
```

## `Radio button`

### NOTE, the `mode="radio"` prop is the key here to achieve that.

```typescript
import { useState } from "react";
import SelectionCheck from "@exsys-patient-insurance/selection-check";
import useFormManager from "@exsys-patient-insurance/form-manager";

const MyComponent = () => {
  const {
    values: { radio },
    handleChange,
  } = useFormManager({
    initialValues: {
      radio: false,
    },
  });

  return (
    <SelectionCheck
      mode="radio"
      checked={radio}
      name="radio"
      onChange={handleChange}
      label="some label"
    />
  );
};
```
