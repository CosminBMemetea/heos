# Vintessa Wine Store (Redux)

## Dev
```
npm install
npm run dev
```

## Build
```
npm run build
npm run preview
```

## Docker
```
docker build -t vintessa-wine-store .
docker run --rm -p 8080:80 vintessa-wine-store
```

Open `http://localhost:8080`.

## CI
This repo uses GitHub Actions (`.github/workflows/ci.yml`) to build the dev Docker image and run tests on every push and PR.
