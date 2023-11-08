# eufemia-react-typecheck-repro

In monorepos where multiple versions of packages might be installed, the React types related to Eufemia can resolve to the wrong `@types/react` package in certain cases.

Even when using `skipLibCheck: true` in `tsconfig.json`, typescript does some verification on lib types when it can resolve type information

## Reproduction steps

```shell
git clone https://github.com/thebreiflabb/eufemia-react-typecheck-repro.git
cd eufemia-react-typecheck-repro
corepack enable
pnpm install
pnpm typecheck1
pnpm typecheck2
```

The last command `pnpm typecheck2` fails with
```shell
> tsc --noEmit

src/Component.tsx:11:13 - error TS2322: Type 'React.ReactNode' is not assignable to type 'import("/home/sokj/projects/temp/eufemia-react-typecheck-repro/node_modules/.pnpm/@types+react@18.2.37/node_modules/@types/react/index").ReactNode'.
  Type '{}' is not assignable to type 'ReactNode'.

11             {children}
               ~~~~~~~~~~
Found 1 error in src/Component.tsx:11
```

## Explanation

app-1 and app-2 have the same code, and use the same Eufemia version, but app 1 uses React 18 (with related `@types/react` 18 packages), while app 2 uses React 17 (with related `@types/react` 17 packages).

Since Eufemia does not refer to any `@types/react` packages, it does a best effort to resolve this package from node_modules, but in both apps, Eufemia resolves react types from `@types/react@18.2.37` which is defined by app-1.

If Eufemia includes optional peerDependencies on `@types/react` and `@types/react-dom`, the package manager will be able to link Eufemias references to these into the ones provided by the app.