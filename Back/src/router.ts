import { Router} from 'express'
import { body } from 'express-validator'
import { createAcount, loguin } from './handlers'
import { handleInputErrors} from './middleware/validation'


const router = Router()

router.post('/auth/register',
    body('handle').notEmpty().withMessage('El handle esta vacio'),
    body('email').isEmail().withMessage('El email no es valido'),
    body('name').notEmpty().withMessage('El name esta vacio'),
    body('password').isLength({min:8}).withMessage('El password es muy corto'),
    handleInputErrors,
    createAcount)


router.post('/auth/loguin',
    body('password').notEmpty().withMessage('El password es obligatorio'),
    body('email').isEmail().withMessage('El email no es valido'),
    handleInputErrors,
    loguin
)

export default router