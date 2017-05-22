# Duck Coins
a cryptocurrency comparison app

### built with Node, React, and Mongo DB

- Compares three cryptocurrencies using BTC-E, Poloniex, and CoinCap APIs
- Stores currency data inside local MongoDB for comparisons
- API routes listed through `/api`

** plus configures bitcoind to create 3 bitcoin addresses

## Use:
- run a local version of mongo (`mongod` in one window, `mongo` in another) and `use cryptodb`
- For development:
  -- run `npm run dev`
- For production:
  -- run `npm run prod` to bundle your resources, then `npm start`

## Log:
#### Day 1
- 45 min
- set up & config

### Day 2
- 45 min
- connecting to Mongo
- setting up Mongoose schemas

### Day 3
- 6 hours
- reworking db setup
- creating api
- configuring webpack
- setting up router & components
- creating base styles
- connecting to BTC-E server-side
- begin aggregating data from all current rates

### Day 4
- 8 hours
- connecting to poloniex and coincap server-side
- grabbing high/low values for each coin
- rendering rates and best exchanges client side
- reworking db schema to work better with apis
- making server and comparison container look for new data every 5 min
- cleaning up data flow
