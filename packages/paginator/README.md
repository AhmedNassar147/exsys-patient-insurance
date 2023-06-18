### `Please Always read the interfaces files if any of current package to see it's properties`.

## Description:

```sh
  React component to render a paginator.
```

# 🔨 Usage Examples

```typescript
import Paginator from "@exsys-patient-insurance/paginator";

const MyComponent = () => {
  return (
    <Paginator
      totalItems={maybe 200}
      currentPage={current active page number}
      onChange={some change handler}
      hideOnSinglePage={true | false}
    />
  );
};
```
