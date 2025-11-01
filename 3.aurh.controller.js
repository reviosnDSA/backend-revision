here different routes are given for different functions like login singup and etc.

  export const signup=async (req,res)=>{
  const {fullName,email,password}=req.body; //take out from req object
  try {
    if(!fullName || !email || !password){
      return res.status(400).json({message:"All fields are required"})
    }
    if(password.length<6){
      return res.status(400).json({message:"Password must be at least of 6 characters"})
    }
    const user=await User.findOne({email})

    if(user) return res.status(400).json({message:"User already exists"})

      //hashpassword
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    const newUser=new User({
      fullName:fullName,
      email:email,
      password:hashedPassword
    })

    if(newUser){
      //generate jwt token
      generateToken(newUser._id,res);
      await newUser.save();

      res.status(201).json({ //201->if something new is created
        _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic:newUser.profilePic
      })

    }
    else{
      res.status(400).json({message:"Invalid user data"})
    }
  } catch (error) {
    console.log("Error in signup controller",error.message);
    res.status(500).json({message:"Internal server error"})
  }
}

⭕different status codes
🟩 200 — OK
✅ Meaning: The request succeeded normally.

  Example:
res.status(200).json({ message: "Logged out successfully" });
Used when data is fetched successfully or an action completes successfully.

 🟦 201 — Created
📦 Meaning: A new resource has been successfully created on the server
Indicates the user was successfully created and stored in the database.
Commonly used for successful POST requests that create new resources.

  res.status(201).json({
  _id: newUser._id,
  fullName: newUser.fullName,
  ...
});

🟨 400 — Bad Request
🚫 Meaning: The client sent invalid data (missing fields, wrong format, etc.).
  Used when something is wrong with the client’s input.

Examples:
Missing required fields
Wrong email format
Password too short
Trying to create a duplicate user

return res.status(400).json({ message: "All fields are required" });

🟥 500 — Internal Server Error
💥 Meaning: Something went wrong on the server — not the client’s fault.
  Typically caused by exceptions, database errors, or bugs in backend code.
Should always include a generic message so you don’t expose internal details.

  res.status(500).json({ message: "Internal server error" });
