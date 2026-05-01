 
 import {
   completeProfileService
 } from "../customerProfile/customerProfile.service.js";
 export const completeProfile = async (req, res) => {
   try {
     const { email, name } = req.body;
 
     if (!email || !name) {
       return res.status(400).json({
         success: false,
         message: "Email & Name required",
       });
     }
 
     const user = await completeProfileService(email, name);
 
     return res.json({
       success: true,
       message: "Profile completed",
       data: user,
     });
 
   } catch (err) {
     return res.status(400).json({
       success: false,
       message: err.message,
     });
   }
 };
 