# Filesearch

A simple class that wraps around an async generator to recursively search a directory given a starting directory and a file or folder name.

```js
// list of file / dir names to ignore (optional)
const IGNORE = [[".git", "node_modules"]];

const searcher = new Filesearch(process.cwd(), "schema.sql", IGNORE);

searcher.getPath().then((result) => console.log("result"));
```
