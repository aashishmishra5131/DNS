import { Router } from "express";
import {domainData,getAllData,deleteData,editData} from "../controller/domain.controller.js";

const router =Router()
router.route("/domain").post(domainData)
 router.route("/alldata").get(getAllData)
router.route("/delete").delete(deleteData)
 router.route("/edit").put(editData)
export default router;