# API testing and exploring App

App for testing and exploring API's similar, similar to Postman or Bruno

## Basic structure

```tree
root
|
+-- backend         # Contains the backend stuff
|
+-- frontend        # Contains the frontend stuff
|
+-- shared          # Contains code used in both frontend and backend
```

[Schema](./schema.puml)

## Some info

- Some folders contain `README.md` file which contains explanation and example
  usage of the folders inside it

[Frontend README](/frontend/README.md)
[Backend README](/backend/README.md)

## Getting started

1. Git clone the project

```bash
git clone https://github.com/d-najd/sweden-fullstack-individual.git
```

2. Install packages

```bash
npm ci
```

3. Run the project

```bash
npm run dev
```

## Shared tech used

- eslint
- typescript
- prettier
- husky - formatting
- git actions - formatting and lint checks
- lint-staged - used with husky
