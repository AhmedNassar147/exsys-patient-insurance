### `Please Always read the interfaces files if any of current package to see it's properties`.

## Description:

```sh
  React component to render a select field.
```

# 🔨 Usage Examples

## `Single and multiple modes`

```typescript
import SelectField from "@exsys-patient-insurance/select-field";
import useFormManager from "@exsys-patient-insurance/form-manager";

const options = [
  {
    key: 1,
    value: "A",
  },
  {
    key: 2,
    value: "B",
  },
  {
    key: 3,
    value: "C",
  },
  {
    key: 4,
    value: "D",
  },
  {
    key: 5,
    value: "VV",
  },
  {
    key: 6,
    value: "BB",
  },
  {
    key: 7,
    value: "CC",
  },
  {
    key: 8,
    value: "DD",
  },
  {
    key: 9,
    value: "VVVVV",
  },
  {
    key: 10,
    value: "BBBB",
  },
  {
    key: 11,
    value: "CCCC",
  },
  {
    key: 12,
    value: "DDDD",
  },
];

const MyComponent = () => {
  const {
    values: {
      singleMode,
      singleModeWithFirstActiveValue,
      multipleMode,
      singleModeWithDisabledKeys,
      multipleModeWithDisabledKeys,
    },
    handleChange,
  } = useFormManager({
    initialValues: {
      singleMode: "",
      singleModeWithFirstActiveValue: "",
      singleModeWithDisabledKeys: "",
      multipleMode: [],
      multipleModeWithDisabledKeys: [],
    },
  });

  return (
    <>
      <SelectField
        name="singleMode"
        value={singleMode}
        options={options}
        onChange={handleChange}
      />

      <SelectField
        name="singleMode"
        value={singleMode}
        options={options}
        onChange={handleChange}
        label="some label"
      />

      <SelectField
        name="singleMode"
        value={singleMode}
        options={options}
        onChange={handleChange}
        label="some label"
        labelType="inlined"
      />

      <SelectField
        name="singleMode"
        value={singleMode}
        options={options}
        onChange={handleChange}
        label="some label"
        error="some error"
      />

      <SelectField
        name="singleMode"
        value={singleMode}
        options={options}
        onChange={handleChange}
        label="some label"
        error="some error"
        allowClear
      />

      <SelectField
        name="singleModeWithFirstActiveValue"
        value={singleModeWithFirstActiveValue}
        options={options}
        onChange={handleChange}
        firstActiveValue="DDDD"
      />

      <SelectField
        name="singleModeWithDisabledKeys"
        disabledKeys={[1, 2]}
        value={singleModeWithDisabledKeys}
        options={options}
        onChange={handleChange}
      />

      <SelectField
        mode="multiple"
        name="multipleMode"
        value={multipleMode}
        options={options}
        onChange={handleChange}
      />

      <SelectField
        mode="multiple"
        disabledKeys={[2, 4]}
        name="multipleModeWithDisabledKeys"
        value={multipleModeWithDisabledKeys}
        options={options}
        onChange={handleChange}
      />
    </>
  );
};
```
