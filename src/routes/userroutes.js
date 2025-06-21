import { Router } from 'express'
import { register, logoutUser, loginUser, refreshAccessToken, changecurrentpass, getcurrentuser, getuserchannelprofile, updateaccountdetails, updateuseravatar, updateusercoveravatar, getwatchhistory } from '../controllers/usercontroller.js'
import { upload } from '../middlewares/multermiddleware.js'
import { verifyjwt } from '../middlewares/authmiddleware.js'
const router = Router()
router.route('/register').post(
    upload.fields([{
        name: "avatar",
        maxCount: 1
    }, {
        name: "coverImage",
        maxCount: 1
    }]),
    register)
// secured routes
router.route("/login").post(loginUser)
router.route("/refreshaccesstoken").post(refreshAccessToken)
router.route("/logout").post(verifyjwt, logoutUser)
router.route("/changepassword").post(verifyjwt, changecurrentpass)
router.route("/currentuser").get(verifyjwt, getcurrentuser)
router.route("/c/:username").get(verifyjwt, getuserchannelprofile)
router.route("/update-account").patch(verifyjwt, updateaccountdetails)
router.route("/avatar").patch(verifyjwt, upload.single("avatar"), updateuseravatar)
router.route("/coverimage").patch(verifyjwt, upload.single("coverImage"), updateusercoveravatar)
router.route("/history").get(verifyjwt, getwatchhistory)
export default router