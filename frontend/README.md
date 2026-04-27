# Frontend

Frontend for the app

## Structure

```
src
|
+-- api               # exported API requests
|
+-- app               # application layer containing:
|   |
|   +-- router.tsx    # application router configuration
|
+-- assets            # contains the static files images, fonts, etc.
|
+-- components        # shared components used across the entire application
|   |
|   +-- ui            # shadcn ui components
|
+-- config            # global configurations, exported env variables etc.
|
+-- features          # feature based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # reusable libraries preconfigured for the application
|
+-- stores            # global state stores
|
+-- types             # shared types used across the application
|
+-- utils             # shared utility functions
```

```
src/features/feature
|
+-- api         # exported API requests related to a specific feature
|
+-- assets      # static files for a specific feature
|
+-- components  # components scoped to a specific feature
|
+-- hooks       # hooks scoped to a specific feature
|
+-- services    # application logic for specific feature
|
+-- stores      # state stores for a specific feature
|
+-- types       # typescript types used within the feature
|
+-- utils       # utility functions for a specific feature
```

[Shared README](../shared/README.md)

## Tech used

- tailwind
- axios
- lucide-react
- shadcn - Components
- zustand - State Management
- chakra-ui - Forgot to remove it at the start and now styles will be messed up if I remove it
