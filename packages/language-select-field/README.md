### `Please Always read the interfaces files if any of current package to see it's properties`.

## Description:

```sh
  React component to render the language select field.
```

# 🔨 Usage Examples

```typescript
import LanguageSelectField { LANGUAGE_SELECT_FIELD_NAME } from '@exsys-clinio/language-select-field';

const INITIAL_FORM_VALUES = {
  [LANGUAGE_SELECT_FIELD_NAME]: 1
}

const MyComponent = () => {
  const {
    values: { [LANGUAGE_SELECT_FIELD_NAME]: selectedLanguageId },
    handleChange
  } = useFormManager({
    initialValues: INITIAL_FORM_VALUES
  });

  <LanguageSelectField
    value={selectedLanguageId}
    onChange={handleChange}
    // default props (name , width, label)
  />;
};
```
