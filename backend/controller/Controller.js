const jwt = require("jsonwebtoken");
const { User, Jobs } = require("../models/Models");

const createToken = (_id,role) => {
  return jwt.sign({_id ,role}, process.env.SECRET, { expiresIn: "3d" });
};
exports.signup = async (req, res) => {
  const { email, pass, passconfirm, name } = req.body;
  try {
    const result = await User.signup(email, pass, passconfirm, name);
    if (typeof result === "object") {
      res.status(200).json({ email});
    } else {
      res.send(result);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.login = async (req, res) => {
    const {email,pass} = req.body;
    try {
      const user = await User.login(email, pass);
  
      if (typeof user === "object") {
        // Signup was successful
        const token = createToken(user._id,user.role);
        res.status(200).json({token});
      } else {
        // Handle signup error
        res.send(user);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }}
    exports.jobview = async (req, res) => {
      try {
        res.status(200).json( await Jobs.view());
      } catch (error) {
        console.error("An error occurred:", error); 
        res.status(500).json({ error: error.message }); 
      }
    };
    exports.add_employee = async (req, res) => {
      try {
        const id =req.body._id
        const information =req.body.information
        res.status(200).json( await Jobs.add_employee(id,information));
      } catch (error) {
        console.error("An error occurred:", error); // Log the error for debugging
        res.status(500).json({ error: error.message }); // Respond with an error status and message
      }
    };
    exports.deletejob = async (req, res) => {
      try {
        const id =req.params.id
   
        res.status(200).json( await Jobs.deletejob(id));
      } catch (error) {
        console.error("An error occurred:", error); // Log the error for debugging
        res.status(500).json({ error: error.message }); // Respond with an error status and message
      }
    };
    exports.editjob = async (req, res) => {
      try {
        console.log('farah awwad')
        const id =req.params.id
   const newedite =req.body
        res.status(200).json( await Jobs.editjob(id,newedite));
      } catch (error) {
        console.error("An error occurred:", error); // Log the error for debugging
        res.status(500).json({ error: error.message }); // Respond with an error status and message
      }
    };

    
