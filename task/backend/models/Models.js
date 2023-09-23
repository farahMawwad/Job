const bcrypt = require("bcrypt");
const validator = require("validator");

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   user_id:String,
    role: String,
    userEmail: String,
    passward: String,
    username: String,
    Age: String,
    Address: String,
    Gender: String,
    phone_numbers: String,
    Experience: String,
    Education: String,
    Upload_CV: String,
    relevant: String,
});

const JobSchema = new mongoose.Schema({

    job_title: String,
      start_date: String,
      due_date: String,
      job_description: String,
      task_level: String,
   
    employee: [userSchema]

});

userSchema.statics.signup = async function (email, pass, passconfirm, name) {
  if (!email && !pass) {
    return "All fields must be filled";
  }
  if (!validator.isEmail(email)) {
    if (!validator.isStrongPassword(pass)) {
      if (pass == "") {
        return "pass field must be filled and Email not valid";
      }
      return "Password not strong enough and Email not valid";
    }
    if (pass != passconfirm) {
      return "Passwordconfirm is not match and Email not valid";
    }
    return "Email not valid";
  }
  if (!validator.isStrongPassword(pass)) {
    if (pass != passconfirm) {
      return "Passwordconfirm is not match and Password not strong enough";
    }
    return "Password not strong enough";
  }
  const exists = await this.findOne({ userEmail:email });
  if (exists) {
    if (!validator.isStrongPassword(pass)) {
      if (pass == "") {
        return "pass field must be filled and Email already in use";
      }
      if (pass != passconfirm) {
        return "Password not strong enough and Email already in use and Passwordconfirm is not match";
      }
      return "Password not strong enough and Email already in use";
    }
    return "Email already in use";
  }

  if (pass != passconfirm)
  {
    return "Passwordconfirm is not match";
  } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(pass,salt);
      const user = await this.create({userEmail:email, passward:hash,username:name, role:1});
      return user;
    
  }
};
userSchema.statics.login = async function (email, pass) {
  if (!email && !pass) {
    return "All fields must be filled";
  }
  const user = await this.findOne({userEmail:email});
  if (!user) {
    return "Incorrect email";
  }
  const match = await bcrypt.compare(pass,user.passward);
  if (!match) {
    return "Incorrect password";
  }
  return user;
};

JobSchema.statics.view = async function () {
  return await this.find({});
};

JobSchema.statics.add_employee = async function (id,information) {
  const job = await this.findById(id);
  job.employee.push(information);
  await job.save();
  return true
};
JobSchema.statics.deletejob = async function (id) {
  console.log(id)
  const job = await this.deleteOne({ _id: id })
  return true
};
JobSchema.statics.editjob = async function (id,newedite) {
  console.log(id)
  console.log(newedite)
  const job = await this.updateOne({ _id: id })
  return true
};

// Create the Jobs model using the schema
const Jobs = mongoose.model('Jobs', JobSchema);
const User = mongoose.model('Users', userSchema);

module.exports = { User, Jobs };



