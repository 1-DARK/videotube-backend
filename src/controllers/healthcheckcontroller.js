import { Apiresponse } from '../utils/Apiresponse.js'
import { asynchandler } from '../utils/asynchandles.js'
const healthcheck = asynchandler(async (req, res) => {
    return res
        .status(200)
        .json(new Apiresponse(200, "OK", "Healthcheck Passed"))
})
export { healthcheck }