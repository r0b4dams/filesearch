import { resolve } from "path";
import { lstat, readdir } from "fs/promises";

export class Filesearch {
  #path = null;

  constructor(path, target, skip) {
    this.searcher = this.#search(path, target);
    this.skip = skip;
  }

  async *#search(path, target) {
    const files = await readdir(path);

    for (const name of files) {
      if (this.skip.includes(name)) {
        continue;
      }

      const filepath = resolve(path, name);
      const filestat = await lstat(filepath);

      if (name === target) {
        yield filepath;
      } else if (filestat.isDirectory()) {
        yield* this.#search(filepath, target);
      }
    }
  }

  async getPath() {
    if (!this.#path) {
      const { value } = await this.searcher.next();
      this.#path = value;
    }
    return this.#path;
  }
}
