export function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(returnPosition);
  } else {
    return 'not working';
  }
}
export function returnPosition(position: GeolocationPosition) {
  return {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };
}
