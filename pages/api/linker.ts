import nc from "next-connect";
import onError from "../../server/middlewares/errors";
import {
    varifyUser
} from "../../server/controller/main";

const handler = nc({ onError });

handler.get(varifyUser);

//Method: POST -- creating new room/user
//handler.post(newPost);

export default handler;