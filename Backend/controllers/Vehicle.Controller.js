import Truck from "../models/Truck.Model.js";
import Trailer from "../models/Trailer.Model.js";

// ADD Truck
export const addTruck = async (req, res) => {

 try {

  const truck = new Truck(req.body);
  await truck.save();

  res.status(201).json(truck);

 } catch (err) {
  res.status(500).json({ message: err.message });
 }
};


// GET Trucks
export const getTrucks = async (req, res) => {

 const trucks = await Truck.find();
 res.json(trucks);

};


// ADD Trailer
export const addTrailer = async (req, res) => {

 try {

  const trailer = new Trailer(req.body);
  await trailer.save();

  res.status(201).json(trailer);

 } catch (err) {
  res.status(500).json({ message: err.message });
 }
};


// GET Trailers
export const getTrailers = async (req, res) => {

 const trailers = await Trailer.find();
 res.json(trailers);

};
