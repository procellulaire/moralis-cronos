import connection from "../../database/connection";
import User from "../../database/userSchema";

export default function __users(req: any, res: any) {
  connection().catch((error) => {
    console.error(error);
  });
  //  const create = new User({
  //   email: "user3",
  //   wallet: "String",
  //   createdAt: Date.now(),
  //   updatedAt: Date.now(),
  //   username: "string1",
  //   password: "String",
  //   avatarId:"String" 
  //  })
  //  create.save().then(()=>{
  //     res.status(200).json(create)
  //  })


//   const { method } = req;
//   switch (method) {
//     case "GET":
//       res.status(200).json({ method: "GET", endpoint: "Users" });
//       break;
//     case "POST":
//       res.status(200).json({ method: "POST", endpoint: "Users" });
//     default:
//       res.setHeader("Allow", ["GET", "POST"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//       break;
//   }
}
