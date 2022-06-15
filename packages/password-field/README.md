### `Please Always read the interfaces files if any of current package to see it's properties`.

## Description:

```sh
  React component to render a password input field.
```

# 🔨 Usage Examples

```typescript
import { useCallback } from "react";
import useFormManager from "@exsys-patient-insurance/form-manager";
import PasswordField from "@exsys-patient-insurance/password-field";

const MyComponent = () => {
  const {
    values: { password },
    handleChange: handleChange,
  } = useFormManager({
    initialValues: {
      password: "",
    },
  });
  return (
    <>
      <PasswordField name="password" value={password} onChange={handleChange} />

      <PasswordField
        name="password"
        value={password}
        onChange={handleChange}
        disabled
      />
    </>
  );
};
```
