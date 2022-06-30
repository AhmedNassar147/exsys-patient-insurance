### `Please Always read the interfaces files if any of current package to see it's properties`.

## Description:

```sh
  React component to get selected years.
```

# 🔨 Usage Examples

const { YEARS } = FORM_KEY_NAMES;

```typescript
const MyComponent = () => {
  const {
    values: { [YEARS]: year_salary },
    handleChange
  } = useFormManager({
    initialValues: {
      ...INITIAL_FORM_VALUES
    }
  });

  <YearsSelectField
    name={YEARS}
    value={year_salary}
    onChange={handleChange}
    howManyYearsBefore={-4}
    howManyYearsAfter={5}
    includeStartingYear
    width="80px"
    label="year"
  />;
};
```
