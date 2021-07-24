import { Storage } from "@google-cloud/storage";
import { Request, Response } from "express";
const storage = new Storage();
const bucket = storage.bucket("zamah-1301.appspot.com");

const listFiles = async (req: Request, res: Response) => {
  try {
    const [files] = await bucket.getFiles();
    console.log("Files:");
    files.forEach((file) => {
      console.log(file.name);
    });
    return res.json({ message: "List of Files:", files });
  } catch (error) {
    return res.status(404).json({ message: "ERROR!", error });
  }
};

const Upload = async (req: Request, res: Response) => {
  let path = req.body.path;
  if (path) {
    try {
      console.log("start upload");
      await bucket.upload(path, {
        //destination: 'mems/'
      });
      console.log("end upload");
      return res.json({ message: "Upload sucessfuly." });
    } catch (error) {
      return res.json({ message: "Filed to Upload!" });
    }
  } else {
    return res.json({ message: "invaild input!" });
  }
};
const Download = async (req: Request, res: Response) => {
    let name = req.body.name;
    if (name) {
        const file = bucket.file(name);

      try {
        await file.download( {
          destination: `/home/samah/Pictures/testing/downloads/${name}`
        });
        return res.json({ message: "Downloaded sucessfuly." });
      } catch (error) {
        return res.json({ message: "Filed to Download!",error });
      }
    } else {
      return res.json({ message: "invaild input!" });
    }
  };


export default { listFiles, Upload, Download };
