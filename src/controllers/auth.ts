import { Request, Response } from "express";
import admin from "firebase-admin";
import jwt from "../jwt/jwt";

const getUsers = async (req: Request, res: Response) => {
  let listUsersResult = await admin.auth().listUsers(10);
  return res.status(200).json({
    message: "The users :",
    listUsersResult,
  });
};

const getUserbyID = async (req: Request, res: Response) => {
  let userID: string = req.params.id;
  if (userID) {
    try {
      const user = await admin.auth().getUser(userID);
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(404)
        .json({ sucess: false, message: "User not found!" });
    }
  }
};
//const idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3MTBiMDE3ZmQ5YjcxMWUwMDljNmMzNmIwNzNiOGE2N2NiNjgyMTEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2FtYWggQWxpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdpVjRhd21hWHpfSG5ST3kwVmNpbWhMT1BCRFJGMEViMDNHa1FFZD1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS96YW1haC0xMzAxIiwiYXVkIjoiemFtYWgtMTMwMSIsImF1dGhfdGltZSI6MTYyNjM0Mjk2MywidXNlcl9pZCI6IkVPaDBxcVZLNjdSSUNxNnBqWFBxTWJOUndDbTEiLCJzdWIiOiJFT2gwcXFWSzY3UklDcTZwalhQcU1iTlJ3Q20xIiwiaWF0IjoxNjI2MzQyOTYzLCJleHAiOjE2MjYzNDY1NjMsImVtYWlsIjoic21haGhhbHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDU5Mjc1NjA0Njk4ODAxNzk4NjUiXSwiZW1haWwiOlsic21haGhhbHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.O9eqBE05Mou_0YTVGwTz9car5evJVM3XMytzbQe14c75756kEkOI1Ppoui5eW8awfS8IGAJ9apTWBpGs0v7E9Mfm5nD8LGFz_BG_-ukLEB9mafPhDpkyaO0NGVceamdQNwDWVxUZ6A4DX51OJHoHa_3DKN5rpJjlAQnxDEpllPUzAVe_BG0Borwv7nHs9MZBSqye3rvQEDiGjYFZWykVIRkOU-u1S1b1Y1CL1pcD10rS59arCm1KoLXTmJORFiWkZ2ATvLMDepHGZ53p31njHvqA_PF-DnuCTxw0BJHMCEqjrnKmidVVLi2PCEeRlkxndjXsFuNHQ6DEyfbPFjKTYA"
const idToken = "Fdvksjblkasflasfl"
const updateUser = async (req: Request, res: Response) => {
  let userID: string = req.params.id;
  let email: string = req.body.email;
  let pass: string = req.body.password;
  //const idToken = req.header('authorization');
  const verfied = await jwt.jwtfun(idToken);
  if(verfied){
    try {
      if (userID) {
        try {
          const user = admin
            .auth()
            .updateUser(userID, {
              email: email,
              password: pass,
            })
            .then((userRecord) => {
              // See the UserRecord reference doc for the contents of userRecord.
              return res
                .status(200)
                .json({ mssage: "Successfully updated user", userRecord });
            })
            .catch((error) => {
              console.log("Error updating user:", error);
            });
        } catch (error) {
          return res
            .status(404)
            .json({ sucess: false, message: "User not found!" });
        }
      }
    } catch (error) {
      return res.status(404).json({ sucess: false, verfied });
    }
  }
};

const addUser = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    res.json({
      sucess: false,
      message: "Please pass email and password correctly",
    });
  } else {
    try {
      let email: string = req.body.email;
      let pass: string = req.body.password;
      let userRecord = await admin.auth().createUser({
        email: email,
        password: pass,
      });
      return res.status(200).json({ userid: userRecord.uid });
    } catch (error) {
      return res.status(404).json({ sucess: false, msg: error.message });
    }
  }
};

const DeleteUser = async (req: Request, res: Response) => {
  let userID: string = req.params.id;
  if (userID) {
    try {
      await admin
        .auth()
        .deleteUser(userID)
        .then(() => {
          return res.status(200).json({ message: "Successfully deleted user" });
        })
        .catch((error) => {
          console.log("Error deleting user:", error);
        });
    } catch (error) {
      return res.status(404).json({ sucess: false, msg: error.message });
    }
  }
};

export default { getUsers, getUserbyID, addUser, DeleteUser, updateUser };
