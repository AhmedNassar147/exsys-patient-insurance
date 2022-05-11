### `Please Always read the interfaces files if any of current package to see it's properties`.

## Description:

```sh
  React component to render a tag.
```

# 🔨 Usage Examples

```typescript
import { useState } from "react";
import Tag from "@exsys-clinio/tag";

const MyComponent = () => (
  <div>
    <Tag children="some value" />

    <Tag children="value" color="green" />

    <Tag children="value" closable={false} />

    <Tag children="value" height="30px" />

    <CloseIcon children="your value" onClose={doSomeLogicFn} />
  </div>
);
```
