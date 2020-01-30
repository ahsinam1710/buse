const router = require("express").Router();
const userController = require("../Controllers/userController");
const postController = require("../Controllers/postController");
const commentController = require("../Controllers/commentController");
const categoryController = require("../Controllers/categoryController");
const subCategoryController = require("../Controllers/subCategoryController");
const fileController = require("../Controllers/fileController");
const auth = require("../Middlewares/auth");
//user register routed
router.post("/register", userController.register);
//user login routes
router.post("/login", userController.login);
router.get("/profile", auth, userController.getprofile);
router.get("/allprofile", auth, userController.getAllProfile);
//logout
router.get("/logout", userController.logout);
//forgot Password
router.get("/forget", userController.getResetPassword);
router.post("/forgot", userController.getResetPassword);
//reset password
//router.get("/reset",userController.)
//post controller routes
router.post("/post", auth, postController.addPost);
router.get("/post", auth, postController.getPost);

//comment controller router
router.post("/comment", auth, commentController.addComment);
router.get("/comment/:post_id", auth, commentController.getComment);

//category controller routes
router.post("/category", auth, categoryController.addCategory);
router.get("/category", auth, categoryController.getCategory);

//subcategory controller routes
router.post("/subcategory", auth, subCategoryController.addSubCategory);
router.get("/subcategory", auth, subCategoryController.getSubCategory);

//file controller routes
router.post("/file", auth, fileController.addFile);
router.get("/file", auth, fileController.getFile);
module.exports = router;
