import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth';

// Registro de usuario
export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await registerUser(email, password);

        res.status(201).json({     
            message: 'Usuario registrado correctamente',
            user
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Inicio de sesión
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const { token } = await loginUser(email, password);

        res.json({ token });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
