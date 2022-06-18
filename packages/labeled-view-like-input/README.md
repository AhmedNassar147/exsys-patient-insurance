### `Please Always read the interfaces files if any of current package to see it's properties`.

## Description:

```sh
  React component to render the labeled input with a flex like input.
```

# 🔨 Usage Examples

```ssh
  by default the component floats the label.
  if you want inlined label you can pass `type="inlined"`
```

```typescript
import LabeledViewLikeInput from "@exsys-patient-insurance/labeled-view-like-input";

const MyComponent = () => (
  <>
    <LabeledViewLikeInput
      label="somelabelid"
      margin="4px 0"
      width="200px"
      value="some value"
    />

    <LabeledViewLikeInput
      label="somelabelid"
      type="inlined"
      value="some value"
    />

    <LabeledViewLikeInput
      label="somelabelid"
      error="some error"
      value="some value"
      // this will show a tool tip has translated error message to user
      // until user fix the error.
      useTooltip
    />

    <LabeledViewLikeInput
      label="somelabelid"
      value="some value"
      error="some error"
      useTooltip
      // controls where the tooltip will be shown
      tooltipPlacement="top"
    />
  </>
);
```
