import express from 'express';
import { getUserProfileAdmin, adminDeleteUser, adminGetUsers, authUser, getUserProfile, 
        newUser, updateUserProfile, adminUpdateUserProfile } from "../controllers/userController.js";
import {protect, adminProtect} from '../middleware/protectMiddleware.js'


const router = express.Router()

router.post('/login', authUser)
router.post('/', newUser)
router
    .route('/profile')
    // .route('/profile/:id')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
router.route('/admin')
    .get(protect, adminProtect, adminGetUsers)
    
router.route('/:id').delete(protect, adminProtect, adminDeleteUser)
                    .get(protect, adminProtect, getUserProfileAdmin)
                    .put(protect, adminProtect, adminUpdateUserProfile)

export default router
