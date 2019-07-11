class Bus {
  constructor(number_plate, manufacturer, model, year, capacity) {
    this.id = Number();
    this.number_plate = number_plate;
    this.manufacturer = manufacturer;
    this.model = model;
    this.year = year;
    this.capacity = capacity;
  }
}

export default Bus;
