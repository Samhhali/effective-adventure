import { Storage } from "@google-cloud/storage";
import { Request, Response } from "express";
const storage = new Storage();


const listBucket = async(req: Request, res:Response)=> {
    try {
        const results = await storage.getBuckets();

        const [buckets] = results;
        console.log('Buckets:');
        buckets.forEach(bucket => {
            console.log(bucket.name);
        });
        return res.status(200).json({message: 'Buckets is here!', results}); 
    } catch (err) {
        return res.status(404).json({message: 'ERROR!', err});
    }
}
export default {listBucket};