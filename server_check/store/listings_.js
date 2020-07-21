const locations = [
  {
    id: 201,
    title: 'Red jacket',
    images: [{ fileName: 'jacket1' }],
    price: 100,
    level_id: 5,
    user_id: 1,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 3,
    title: 'Gray couch in a great condition',
    images: [{ fileName: 'couch2' }],
    level_id: 1,
    price: 1200,
    user_id: 2,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 1,
    title: 'Room & Board couch (great condition) - delivery included',
    description:
      "I'm selling my furniture at a discount price. Pick up at Venice. DM me asap.",
    images: [
      { fileName: 'couch1' },
      { fileName: 'couch2' },
      { fileName: 'couch3' },
    ],
    price: 1000,
    level_id: 1,
    user_id: 1,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 2,
    title: 'Designer wear shoes',
    images: [{ fileName: 'shoes1' }],
    level_id: 5,
    price: 100,
    user_id: 2,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 102,
    title: 'Canon 400D (Great Condition)',
    images: [{ fileName: 'camera1' }],
    price: 300,
    level_id: 3,
    user_id: 1,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 101,
    title: 'Nikon D850 for sale',
    images: [{ fileName: 'camera2' }],
    price: 350,
    level_id: 3,
    user_id: 1,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 4,
    title: 'Sectional couch - Delivery available',
    description: 'No rips no stains no odors',
    images: [{ fileName: 'couch3' }],
    level_id: 1,
    price: 950,
    user_id: 2,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 6,
    title: 'Brown leather shoes',
    images: [{ fileName: 'shoes2' }],
    level_id: 5,
    price: 50,
    user_id: 2,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
];

const addListing = (location) => {
  location.id = locations.length + 1;
  locations.push(location);
};

const getLocations = () => locations;

const getListing = (id) => locations.find((location) => location.id === id);

const filterListings = (predicate) => locations.filter(predicate);

module.exports = {
  addListing,
  getLocations,
  getListing,
  filterListings,
};
