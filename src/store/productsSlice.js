import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 'velvet-syrah',
      name: 'Velvet Syrah',
      region: 'Napa Valley, CA',
      year: 2019,
      price: 64,
      rating: 4.8,
      notes: 'Blackberry, smoked cedar, dark chocolate'
    },
    {
      id: 'lunar-pinot',
      name: 'Lunar Pinot Noir',
      region: 'Willamette, OR',
      year: 2021,
      price: 48,
      rating: 4.6,
      notes: 'Wild cherry, violets, silky tannins'
    },
    {
      id: 'ember-cab',
      name: 'Ember Cabernet',
      region: 'Sonoma, CA',
      year: 2018,
      price: 72,
      rating: 4.9,
      notes: 'Cassia, plum, espresso, bold finish'
    },
    {
      id: 'golden-chard',
      name: 'Golden Chardonnay',
      region: 'Russian River, CA',
      year: 2022,
      price: 38,
      rating: 4.4,
      notes: 'Baked pear, toasted almond, vanilla'
    },
    {
      id: 'midnight-malbec',
      name: 'Midnight Malbec',
      region: 'Mendoza, AR',
      year: 2020,
      price: 42,
      rating: 4.7,
      notes: 'Blueberry, cocoa nib, velvet spice'
    },
    {
      id: 'rose-comet',
      name: 'Rosé Comet',
      region: 'Provence, FR',
      year: 2023,
      price: 29,
      rating: 4.3,
      notes: 'Strawberry, citrus zest, crisp mineral'
    }
  ]
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}
});

export default productsSlice.reducer;
