import admin from "firebase-admin";
import { Request, Response } from "express";

// const idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3MTBiMDE3ZmQ5YjcxMWUwMDljNmMzNmIwNzNiOGE2N2NiNjgyMTEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2FtYWggQWxpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdpVjRhd21hWHpfSG5ST3kwVmNpbWhMT1BCRFJGMEViMDNHa1FFZD1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS96YW1haC0xMzAxIiwiYXVkIjoiemFtYWgtMTMwMSIsImF1dGhfdGltZSI6MTYyNjM0Mjk2MywidXNlcl9pZCI6IkVPaDBxcVZLNjdSSUNxNnBqWFBxTWJOUndDbTEiLCJzdWIiOiJFT2gwcXFWSzY3UklDcTZwalhQcU1iTlJ3Q20xIiwiaWF0IjoxNjI2MzQyOTYzLCJleHAiOjE2MjYzNDY1NjMsImVtYWlsIjoic21haGhhbHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDU5Mjc1NjA0Njk4ODAxNzk4NjUiXSwiZW1haWwiOlsic21haGhhbHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.O9eqBE05Mou_0YTVGwTz9car5evJVM3XMytzbQe14c75756kEkOI1Ppoui5eW8awfS8IGAJ9apTWBpGs0v7E9Mfm5nD8LGFz_BG_-ukLEB9mafPhDpkyaO0NGVceamdQNwDWVxUZ6A4DX51OJHoHa_3DKN5rpJjlAQnxDEpllPUzAVe_BG0Borwv7nHs9MZBSqye3rvQEDiGjYFZWykVIRkOU-u1S1b1Y1CL1pcD10rS59arCm1KoLXTmJORFiWkZ2ATvLMDepHGZ53p31njHvqA_PF-DnuCTxw0BJHMCEqjrnKmidVVLi2PCEeRlkxndjXsFuNHQ6DEyfbPFjKTYA"

// const jwt = async (req:Request, res:Response)=>{
//     //const idToken = req.header('authorization');
//    await admin.auth().verifyIdToken(idToken)
//   .then((decodedToken) => {
//     const uid = decodedToken.uid;
//     const email = decodedToken.email;
//     return res.status(200).json({message: "the email = ", email});
// })
//   .catch((error) => {
//     return res.status(404).json({message: "Failed", error});

// });
// }

async function jwtfun(Token: string) {
  let flag: boolean =  true;
  try {
    await admin.auth().verifyIdToken(Token).then((decodedToken) => {
        const uid = decodedToken.uid;
        const email = decodedToken.email;
      })
  } catch (error) {
    console.log("error: ", error);
    flag = false;
    
  }
  if (flag) return true;
  else return false;
}
export default { jwtfun };
