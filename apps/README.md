# How to create new template manually?

## 1. Create new nx app with script `yarn create-app`:
```shell
yarn create-template tgs-web-t123
// or
nx g @nx/react:app tgs-web-t123

✔ Would you like to add React Router to this application? (y/N) · false
✔ Which E2E test runner would you like to use? · none
✔ What should be the project name and where should it be generated? · tgs-web-t123 @ apps/tgs-web-t123

```

## 2. For *absolute path*, Update tsconfig.app.json with following:
```typescript jsx
{
  //  ...
  "compilerOptions": {
  //...
    "allowJs": true, // for legacy code adapting
    "baseUrl": ".",  // make project absolute path working
    "paths": {
        "@/*": ["./src/*"], // make project absolute path working
       // make project can load libs successfully
        "@tgs-web-nx/config": ["../../libs/config/src/index.ts"],
        "@tgs-web-nx/constants": ["../../libs/constants/src/index.ts"],
        "@tgs-web-nx/core": ["../../libs/core/src/index.ts"],
        "@tgs-web-nx/core/hooks": ["../../libs/core/hooks/src/index.ts"],
        "@tgs-web-nx/core/features": ["../../libs/core/features/src/index.ts"],
        "@tgs-web-nx/types": ["../../libs/types/src/index.ts"], 
        "@tgs-web-nx/utils": ["../../libs/utils/src/index.ts"]
      }     
  }
  
  //  ...
}
```

>NOTE: In order to enable the use of *absolute paths* in the project, we added `basePath: "."` and `path:{ "@/*": ["./src/*"] }`. However, this caused the paths originally specified in `tsconfig.base.json` by nx to be overwritten (not merged, but overridden). At this point, we need to reassign the paths for the library to restore functionality.


## 3. Also update vite.config.ts:
```typescript jsx
import { resolve } from "path";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
  //...
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000, // change your favorite port
    host: "localhost",
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
      ],
    },
  },
  //...
}


```

## Optional: Replace whole src with `apps/template/src` (don't forget `index.html` and `public` in the root of project)
`apps/template/src` contains full functionality of tgs template, you can copy all of it them just modify css.



# CICD
## 1. create docker-build custom script in `project.json`
```typescript jsx
{
  "targets": {
    "build": {
    //...
    },
    "serve": {
    //...
    },
    "preview": {
    //...
    },
    "test": {
    //...
    },
    "lint": {
    //...
    },
    // create custom target: docker-build
    "docker-build": {
      "executor": "nx:run-commands",
      "defaultConfiguration": "production",
      "options": {
        "commands": [
          "docker build -f {args.AppPath}/Dockerfile . -t {args.DockerContainerRegistry}{args.ImageName}:`date +%Y-%m%d-%H%M`"
        ],
        "parallel": false
      },
      "configurations": {
        "production": {
          "DockerContainerRegistry": "pgtgs/",
          "AppPath": "./apps/tgs-web-template",
          "ImageName": "tgs-web-template"
        }
      }
    }
  },
  //...
}

```

after complete above setting, just you enter `yarn docker-build:single tgs-web-123`,then `nx` will invoke commands you specified above.
