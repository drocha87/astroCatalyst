# Astro with Catalyst

This project is a experimentation on using
[Catalyst](https://catalyst.rocks/guide/introduction/) together with [astro
js](https://astro.build/).

These are the steps necessary to integrate catalyst with astro.

```sh
npm install @github/catalyst
```

After adding the catalyst to your project you need to configure typescript so it
enables using decorators.

In your `tsconfig.json` add the properties to `compilerOptions`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "preserve",
    "target": "ES2020",
    "emitDecoratorMetadata": true,
    "strictPropertyInitialization": false,
    "sourceMap": true,
    "experimentalDecorators": true
  }
}

```

And configure the build system to keep the class names as it is mandatory to
catalyst, adding this vite configuration to `defineConfig` in `astro.config.mjs`

```js
 vite: {
    esbuild: {
      minifyIdentifiers: false,
    },
  }
```

After that you can take a look at the components inside the `components` folder.
