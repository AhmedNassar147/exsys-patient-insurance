### `Please Always read the interfaces files if any of current package to see it's properties`.

## Description:

```sh
  React component to render radio or checkbox group.
```

# 🔨 Usage Examples

## `Checkbox group`

```typescript
import { useState } from "react";
import SelectionCheckGroup from "@exsys-patient-insurance/selection-check-group";
import useFormManager from "@exsys-patient-insurance/form-manager";

const MyComponent = () => {
  const {
    values: { checkBox },
    handleChange,
  } = useFormManager({
    initialValues: {
      checkBox: [],
    },
  });

  return (
    <SelectionCheckGroup
      checked={checkBox}
      name="checkBox"
      onChange={handleChange}
      options={[
        { label: "some label", value: "1" },
        { label: "next label", value: "2" },
        { label: "again next label", value: "3", disabled: true },
      ]}
    />
  );
};
```

## `Radio Group`

### NOTE, the `mode="radio"` prop is the key here to achieve that.

```typescript
import { useState } from "react";
import SelectionCheckGroup from "@exsys-patient-insurance/selection-check-group";
import useFormManager from "@exsys-patient-insurance/form-manager";

const MyComponent = () => {
  const {
    values: { radio },
    handleChange,
  } = useFormManager({
    initialValues: {
      radio: [],
    },
  });

  return (
    <SelectionCheckGroup
      mode="radio"
      name="radio"
      checked={radio}
      onChange={handleChange}
      options={[
        { label: "some label", value: "1" },
        { label: "next label", value: "2" },
        { label: "xyz", value: "3" },
      ]}
    />
  );
};
```
