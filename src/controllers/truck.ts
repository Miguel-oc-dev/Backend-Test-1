import { Request, Response, RequestHandler } from 'express';
import Truck from '../models/truck';

// Crear una unidad
    export const createTruck: RequestHandler = async (req, res) => {
    const { year, color, plates } = req.body;

    try {
        const truck = new Truck({
            user: req.user!.id,
            year,
            color,
            plates
        });

        await truck.save();

        res.status(201).json(truck);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
        }
    };

    // Obtener una unidad
    export const getTrucks: RequestHandler = async (req, res) => {
    try {
        const trucks = await Truck.find({ user: req.user!.id });
        res.json(trucks);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
        }
    };

    // Actualizar una unidad
    export const updateTruck: RequestHandler = async (req, res) => {
    const { year, color, plates } = req.body;

    try {
        const truck = await Truck.findOne({ _id: req.params.id, user: req.user!.id });

        if (!truck) {
        return;
        }

        truck.year = year || truck.year;
        truck.color = color || truck.color;
        truck.plates = plates || truck.plates;

        await truck.save();

        res.json(truck);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
    };

    // Borrar
    export const deleteTruck: RequestHandler = async (req, res) => {
    try {
        const truck = await Truck.findOneAndDelete({ _id: req.params.id, user: req.user!.id });

        if (!truck) {
        return;
        }   

        res.json({ message: 'Unidad eliminada...' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};