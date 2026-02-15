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


Create the development key 
ssh-keygen -t ed25519 -f ~/.ssh/id_heos_travis -C "youremail@domain.com"
Copy the development key

pbcopy < ~/.ssh/id_heos_travis.pub this should be copy in the repo Deploy key

Add environment variable in travis SSH_PRIVATE_KEY and copy the private key 
pbcopy < ~/.ssh/id_heos_travis 