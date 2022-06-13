### `Please Always read the interfaces files if any of current package to see it's properties`.

## Description:

```sh
  React component to render a select field and calls the given the apiId then sets the values to the select options.
```

# 🔨 Usage Examples

## `Single and multiple modes`

```typescript
import SelectWithApiQuery from "@exsys-patient-insurance/select-with-api-query";
import useFormManager from "@exsys-patient-insurance/form-manager";

const MyComponent = () => {
  const {
    values: {
      organization_no,
      multipleMode,
      singleModeWithAutoComplete,
      multipleModeWithAutoComplete,
    },
    handleChange,
  } = useFormManager({
    initialValues: {
      organization_no: "",
      multipleMode: [],
      singleModeWithAutoComplete: "",
      multipleModeWithAutoComplete: "",
    },
  });

  return (
    <>
      <SelectWithApiQuery
        queryType="query"
        apiOrCodeId="FINANCIAL_ORGANIZZATION"
        name="organization_no"
        value={organization_no}
        onChange={handleChange}
        label="some label"
      />

      <SelectWithApiQuery
        queryType="query"
        apiOrCodeId="FINANCIAL_ORGANIZZATION"
        name="organization_no"
        value={organization_no}
        onChange={handleChange}
        label="some label"
        toolTipPlacement="right"
      />

      <SelectWithApiQuery
        queryType="query"
        apiOrCodeId="FINANCIAL_ORGANIZZATION"
        name="organization_no"
        value={organization_no}
        onChange={handleChange}
        label="some label"
        preselectFirstKey
      />

      <SelectWithApiQuery
        //NOTE: the current api should allow `searchKeyword` as an api query parameter.
        mode="autocomplete"
        queryType="query"
        apiOrCodeId="SOME API ID"
        name="singleModeWithAutoComplete"
        value={singleModeWithAutoComplete}
        onChange={handleChange}
        label="some label"
      />

      <SelectWithApiQuery
        mode="multiple"
        queryType="query"
        apiOrCodeId="SOME API ID"
        name="multipleMode"
        value={multipleMode}
        onChange={handleChange}
        label="some label"
      />

      <SelectWithApiQuery
        //NOTE: the current api should allow `searchKeyword` as an api query  parameter.
        mode="multiple-autocomplete"
        queryType="query"
        apiOrCodeId="SOME API ID"
        name="multipleModeWithAutoComplete"
        value={multipleModeWithAutoComplete}
        onChange={handleChange}
        label="some label"
      />
    </>
  );
};
```
