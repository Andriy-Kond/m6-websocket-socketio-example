### Starting with `Node.js 20.11/21.2`, you can use `import.meta.dirname` (https://nodejs.org/api/esm.html#importmetadirname):

```js
const __dirname = import.meta.dirname;
```

For `Node.js 10.12` and higher there's an alternative that doesn't require creating multiple files and handles special characters in filenames across platforms:

```js
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
join(__dirname, "index.html");
// The built-in modules 'path' and 'url' can be optionally prefixed with the node scheme as 'node:path' and 'node:url' since Node.js 14.14.
```

### Other example/option:

```js
// __dirname from path:
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // path to file in ESM
const __dirname = path.dirname(__filename); // path to dir in ESM
const contactsPath = path.join(__dirname, "contacts.json"); // Normalize slashes
```

### For `JEST` the `__dirname` must be declared as in for `Node.js 10.12`:

```js
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
// Otherwise in __dirname will ber 'undefined'
```
