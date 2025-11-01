here we create different routes and whose application is written in controllers folder

const router=express.Router(); //this way router are created

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)
