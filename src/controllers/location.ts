import { RequestHandler } from "express";
import Location from '../models/location';
import { getPlaceDetails } from "../services/googleMaps";

// Crear nueva ubicación
export const createLocation: RequestHandler = async (req, res) => {
    const { place_id } = req.body;

    try {
        const existing = await Location.findOne({ place_id });
        if (existing) {
        res.status(400).json({ message: 'La ubicación ya existe' });
        return;
        }

        // Obtener detalles del lugar
        const placeDetails = await getPlaceDetails(place_id);

        const location = new Location({
        user: req.user!.id,
        place_id,
        address: placeDetails.address,
        latitude: placeDetails.latitude,
        longitude: placeDetails.longitude
        });

        await location.save();

        res.status(201).json(location);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
    };

    // Listar ubicaciones
    export const getLocations: RequestHandler = async (req, res) => {
    try {
        const locations = await Location.find({ user: req.user!.id });
        res.json(locations);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
    };

    // Borrar una ubicación
    export const deleteLocation: RequestHandler = async (req, res) => {
    try {
        const location = await Location.findOneAndDelete({ _id: req.params.id, user: req.user!.id });

        if (!location) {
        res.status(404).json({ message: 'Ubicación no encontrada' });
        return;
        }

        res.json({ message: 'Ubicación eliminada' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};