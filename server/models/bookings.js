class Booking {
  constructor(
    user_id,
    trip_id,
    bus_id,
    trip_date,
    seat_number,
    first_name,
    last_name,
    email
  ) {
    this.id = Number();
    this.user_id = user_id;
    this.trip_id = trip_id;
    this.bus_id = bus_id;
    this.trip_date = trip_date;
    this.seat_number = seat_number;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }
}

export default Booking;
