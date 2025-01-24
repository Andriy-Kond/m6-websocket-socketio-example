Starting with `Node.js 18.0.0` for import JSON through `import` needs to specify attribute `assert` with json-type.

```js
import contacts from "./contacts.json" assert { type: "json" };
```
