here we create different routes and whose application is written in controllers folder

const router=express.Router(); //this way router are created

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

//protectRoute is the middleware->it means the user must be validated then only it can updateProfile,protectRoute then updateProfile
router.put("/update-profile",upload.single("profilePic"), protectRoute,updateProfile) 

router.get("/check",protectRoute,checkAuth); //to check if the user is authenticated or not
