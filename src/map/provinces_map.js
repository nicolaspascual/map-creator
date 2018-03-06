import provinces from './provinces.json';
import Map from './map';

const map = new Map(
    'map',
    [40.4168, -3.7038],
    13,
    provinces
);

export { map };