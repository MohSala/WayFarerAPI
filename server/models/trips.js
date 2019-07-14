class Trip {
  constructor(bus_id, origin, destination, fare, status = 0) {
    this.id = Number();
    this.bus_id = Number();
    this.origin = origin;
    this.destination = destination;
    this.trip_date = new Date().toDateString();
    this.fare = fare;
    this.status = status;
  }
}

export default Trip;
