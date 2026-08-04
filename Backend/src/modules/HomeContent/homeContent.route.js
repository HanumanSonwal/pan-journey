import express from "express";

import {

createHomeContentController,
getHomeContentController,
updateHomeContentController,
deleteHomeContentController,
getAdminHomeContentController

}
from "./homeContent.controller.js";


import {protect} from "../../middleware/auth.middleware.js";
import { checkPermission } from "../../middleware/checkPermission.js";


const router = express.Router();



// ADMIN CREATE

router.post(
"/create",
protect,checkPermission("homeContent", "write"),

createHomeContentController
);



// WEBSITE GET

router.get(
"/",
getHomeContentController
);

// ADMIN GET ALL

router.get(
"/admin",
protect,
checkPermission("homeContent", "view"),
getAdminHomeContentController
);

// ADMIN UPDATE


router.put(
"/update/:id",
protect,
checkPermission("homeContent", "update"),
updateHomeContentController
);




// ADMIN DELETE


router.delete(
"/delete/:id",
protect,
checkPermission("homeContent", "delete"),
deleteHomeContentController
);



export default router;