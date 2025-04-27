import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
    let token;

    console.log('Headers que llegan: ', req.headers );
    

    // Seccion para verificar que el header exista
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        try{
        token = req.headers.authorization.split(' ')[1];
        console.log('Token extraido: ', token);
        

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        console.log('Token decodificado: ', decoded);
        

        req.user = { id: decoded.id};

        next();
        } catch (error) { 
            console.error('Error en la verificacion del token', error);
            res.status(401).json({message: 'Acceso no autorizado, token invalido'});
        }
    }

    if (!token) {
        console.error('No se envio la autorizacion');
        res.status(401).json({ message: 'Acceso no autorizado, ausencia de token'})
    }
};