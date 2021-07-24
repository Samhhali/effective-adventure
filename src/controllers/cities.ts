import { Request, Response } from "express";
import admin from "firebase-admin";
const db = admin.firestore();
const citiesRef = db.collection("cities");


const getAllCities = async (req: Request, res: Response) => {
  let snapshot = await citiesRef.get();
  if (snapshot.empty) {
    console.log("No matching documents.");
  }
  let results: {[key: string]: any} = {};
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
    results[doc.id] = doc.data();
  });
  return res.status(200).json(results);
};

const getDocByID = async (req: Request, res: Response) => {
  let docID: string = req.params.id;
  if (docID) {
    try {
      const cityRef = citiesRef.doc(docID);
      const doc = await cityRef.get();
      if (!doc.exists) {
        return res
          .status(404)
          .json({ sucess: false, message: "No such document!" });
      } else {
        let data = doc.data();
        return res
          .status(200)
          .json({ sucess: true, message: "Document Data: ", data });
      }
    } catch (error) {
      return res
        .status(404)
        .json({ sucess: false, message: "No such document!" });
    }
  } else {
    return res.status(404).json({ message: "Wrong ID!" });
  }
};
const getDocByName = async (req: Request, res: Response) => {
  let name: string = req.params.name;
  console.log(name);
  
  if (name) {
    try {
      const doc = await citiesRef.where('name', '==', name).get();
      if (doc.empty) {
        return res
          .status(404)
          .json({ sucess: false, message: "No such document here!"});
      } else {
        doc.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        })
        return res
          .status(200)
          .json({ sucess: true, message: "Document Data: " });
      }
    } catch (error) {
      return res
        .status(404)
        .json({ sucess: false, message: "No such document!" });
    }
  } else {
    return res.status(404).json({ message: "Wrong name!" });
  }
};

const addCity = async (req: Request, res: Response) => {
  let first: string = req.body.first;
  let last: string = req.body.last;
  let born: string = req.body.born;

  const docRef = citiesRef.doc("alovelace");
  await docRef.set({
    first: first,
    last: last,
    born: born,
  });
  console.log("Done setting!");
  return res.json({ message: "Done setting!" });
};

const updateCity = async (req: Request, res: Response) => {
  let cityID: string = req.params.id;
  let first: string = req.body.first;
  let last: string = req.body.last;
  let born: string = req.body.born;
  if (cityID) {
    try {
      const docRef = citiesRef.doc(cityID);
      await docRef.update({
        first: first,
        last: last,
        born: born,
      });
      let data = (await docRef.get()).data();
     return res.status(200).json({ sucess: true, message: "Updated Data: ", data });

    } catch (error) {
      return res
        .status(404)
        .json({ sucess: false, message: "Failed to update!",error });
    }
  }else{
    return res.status(404).json({sucess: false, Message: "wrong ID!"});
  }
};

const deleteCity = async (req: Request, res: Response) => {
  let cityID: string = req.params.id;
  if(cityID){
    try {
      const result = await citiesRef.doc(cityID).delete();
      return res.status(200).json({sucess: true, message: "Sucessfult Deleted"});
    } catch (error) {
      return res.status(404).json({sucess: false, message:" Failed to delete", error} );
    }
  }else{
    return res.json({sucess: false, message: "Wrong ID"});
  }
}


export default { getAllCities, getDocByID, addCity, updateCity, deleteCity, getDocByName};
