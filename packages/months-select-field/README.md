### `Please Always read the interfaces files if any of current package to see it's properties`.

## Description:

```sh
  React component tot get months fields .
```

# 🔨 Usage Examples

```typescript
import MonthsSelectField from "@exsys-patient-insurance/months-select-field";
const { MONTH } = FORM_KEY_NAMES;

const MyComponent = () => {
  const {
    values: { [MONTH]: month_salary },
    handleChange,
  } = useFormManager({
    initialValues: INITIAL_FORM_VALUES,
  });

  <MonthsSelectField
    name={MONTH}
    value={month_salary}
    onChange={handleChange}
    width="80px"
    label="month"
  />;
};
```
