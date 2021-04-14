# Gacha Simulator Project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### run json-server
#### the server is run on port 3000
```
npm run backend
```

## Details

### About
> This Project made with Vue-router CLI. With fetch API to contact with json-server

### Features
> Single Page App using Routing-views

> Gacha simulation for video game
> - Genshin Impact
> - Blue Archive
> - Uma Musume: Pretty Derby

> Inventory to store draw data. 

### Where to use fetch APIs
- GET : Results.vue -> To get data from /prizes (added to gacha pool),
- GET : Results.vue -> To get data from /inv (use to check if duplicate or not)
- POST : Results.vue -> To add new data into /inv
- PUT : Results.vuw -> To update amount of duplicated data in /inv
