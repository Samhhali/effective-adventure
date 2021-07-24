import admin from 'firebase-admin'
import { Request, Response } from "express";
const db = admin.database();

const ref = db.ref("Blog");

const read = async (req: Request, res: Response) => { 
    try {
        ref.on('value', (snapshot) => {
            console.log(snapshot.val());
          }); 
        return res.json({sucess: true, message: "Read scussesfuly"});
          
    } catch (error) {
        return res.json({sucess: false, message: "The read failed:" ,error});        
    }
};

// const write = async (req: Request, res: Response) => { 

// }


export default {read};