const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "Secret word";


const usersModel = require("../model/model");
const  { restrict }=require("../middleware/restrict_mw")
const router = express.Router();


//Returns a list of classes
router.get("/users", async (req, res, next) => {
  try {
  res.json(await usersModel.find());
  next()
  } catch (err) {
    next(err);
  }
});

// Returns details of a class by id
router.get("/howtoz/:id",restrict(), async (req, res, next) => {
  try {
    res.json(await usersModel.findByHowtoz(req.params.id))
  }catch(err){
      next(err);
  }
});

// Returns a list of instructors
router.get("/howtoz",restrict(),async (req, res, next) => {
  try {
    res.json(await usersModel.findHowtoz());
  } catch (err) {
    next(err);
  }
});


router.post("/howtoz/:id", restrict(), async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
  
      const clientClass = clientsModel.findHowtoz(
        req.body.id,
       id
      );
      // console.log("Client class", clientClass);
      if (clientClass) {
        return res.status(400).json(clientClass);
      }
  
      await clientsModel.joinClass(req.body.id, id);
  
      res.status(201).json({ message: "Class joined successfully" });
      next();
    } catch (err) {
      next(err);
    }
  });

// Do I need a router.get() for returning instructor details

//Create new user
router.post("/register", async (req, res, next) => {
  try {
    const { name, username, password } = req.body;
    // const role = req.body.role.toLowerCase();

    if (!name || !username || !password) {
      return res
        .status(409)
        .json({ message: "Incomplete information for registration" });
    }

   /*  if (role === "instructor") {
      const user = await usersModel.findByInstructors({ username }).first();
      if (user) {
        return res.status(409).json({ message: "Username must be unique" });
      } */

      const newUser = await usersModel.add({
        name: name.toLowerCase(),
        username: username.toLowerCase(),
        password: await bcryptjs.hash(password, 2),
      });

      return res.status(201).json(newUser);
  
  } catch (err) {
    next(err);
  }
});

//Login router
router.post("/login", async (req, res, next) => {
  try {
    const username = req.body.username.toLowerCase();
    // const role = req.body.role.toLowerCase();
    const password = req.body.password;

    // if (role === "instructor") {
      const user = await usersModel.find({ username }).first();

      if (user && (await bcryptjs.compare(password, user.password))) {
        const token = generateToken(user);

        res.status(200).json({ message: `Welcome ${username}`, token });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
   
    next();
  } catch (err) {
    next(err);
  }
});

//Logout router Still broken
router.get("/logout", async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.status(204).end();
      }
      next();
    });
  } catch (err) {
    next(err);
  }
});

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
