const locations = [
  {
    id: 1,
    loc_name: 'Offices',
    user_id: 1,
  },
  {
    id: 2,
    loc_name: 'Warehouse',
    user_id: 1,
  },
];
const addLocation = (location) => {
  location.id = locations.length + 1;
  locations.push(location);
};

const getLocations = () => locations;

const getLocation = (id) =>
  locations.find((location) => location.location_id === id);

const filterLocations = (predicate) => locations.filter(predicate);

module.exports = {
  addLocation,
  getLocations,
  getLocation,
  filterLocations,
};
