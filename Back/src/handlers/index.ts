import { Response, Request } from "express";
import slugify from "slugify";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";

const createAcount = async (req: Request, res: Response) => {
  try {
    
   
    const { email, password, handle: rawHandle } = req.body;

    //  Validar si el email ya está en uso
    const userExist = await User.findOne({ email });
    if (userExist) {
       res.status(400).json({ error: "El email ya está en uso" });
    }

    //  Validar si el handle ya está en uso
    const handle = slugify(rawHandle || email, { lower: true });
    const handleExist = await User.findOne({ handle });
    if (handleExist) {
       res.status(400).json({ error: "El nombre de usuario ya está en uso" });
    }

    //  Crear y guardar el usuario
    const user = new User({
      ...req.body,
      password: await hashPassword(password),
      handle,
    });

    await user.save();
     res.status(201).json({ message: "Usuario creado correctamente" });

  } catch (error) {
    console.error(error);
     res.status(500).json({ error: "Error del servidor" });
  }
};


const loguin = async (req : Request, res: Response) => {


     try {

   const { email, password, handle: rawHandle } = req.body;

   // Validacion de email
     const user = await User.findOne({ email });
    if (!user) {
       res.status(404).json({ error: "El usuario no existe" });
    }

    // Validacion de password
    const isPasswordCorrect = await checkPassword( password, user.password)

      if (!isPasswordCorrect) {
       res.status(414).json({ error: "El password es incorrecto" });
    }

    res.send('Autenticado')
      
     } catch (error) {
      console.error(error);
     res.status(500).json({ error: "Error del servidor" });
     }

    
}

export { createAcount, loguin };
