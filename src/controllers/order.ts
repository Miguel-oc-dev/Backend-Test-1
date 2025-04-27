import { RequestHandler } from "express";
import Order from '../models/order';

// Crear nueva orden
export const createOrder: RequestHandler = async (req, res) => {
    const { truck, pickup, dropoff } = req.body;

    try {
        const order = new Order({
            user: req.user!.id,
            truck,
            pickup,
            dropoff,
            status: 'created'
        });

        await order.save();

        res.status(201).json(order);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
    };

    // Obtener todas las órdenes del usuario
    export const getOrders: RequestHandler = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user!.id })
        .populate('truck')
        .populate('pickup')
        .populate('dropoff');
        res.json(orders);
    } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    // Cambiar el estatus de una orden
    export const updateOrderStatus: RequestHandler = async (req, res) => {
    const { status } = req.body;

    try {
        const order = await Order.findOne({ _id: req.params.id, user: req.user!.id });

        if (!order) {
        res.status(404).json({ message: 'Order not found' });
        return;
        }

        if (!['created', 'in transit', 'completed'].includes(status)) {
        res.status(400).json({ message: 'Estatus invalido' });
        return;
        }          

        order.status = status;
        await order.save();

        res.json(order);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};