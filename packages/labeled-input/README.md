### `Please Always read the interfaces files if any of current package to see it's properties`.

## Description:

```sh
  React component to render a wrapper with translated label around give input field.
```

# 🔨 Usage Examples

```ssh
  by default the component floats the label.
  if you want inlined label you can pass `type="inlined"`
```

```typescript
import labeledInput from "@exsys-clinio/labeled-input";

const MyComponent = () => (
  <>
    <labeledInput label="somelabelid" margin="4px 0" width="200px">
      // you input goes here
    </labeledInput>

    <labeledInput label="somelabelid" type="inlined">
      // you input goes here
    </labeledInput>

    <labeledInput
      label="somelabelid"
      error="some error"
      // this will show a tool tip has translated error message to user
      // until user fix the error.
      useTooltip
    >
      // you input goes here
    </labeledInput>

    <labeledInput label="somelabelid" error="some error">
      // you input goes here
    </labeledInput>
  </>
);
```
