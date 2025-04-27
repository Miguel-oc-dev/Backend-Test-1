import User from "../models/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Función para registrar usuario
export const registerUser = async (email: string, password: string) => {
    const userExists = await User.findOne({ email });
    if (userExists){     
        throw new Error('El usuario ya existe...');
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        email,
        password: hashedPassword
    });

    return user;
};

// Función para loguear usuario
export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if(!user) {
        throw new Error('Credenciales invalidas');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error('Credenciales invalidas');
    }

    // Generación del token
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
    );   
    
    return { token };
};
