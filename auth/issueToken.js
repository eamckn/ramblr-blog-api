import jwt from "jsonwebtoken";

const issueJwt = async (user) => {
  const payload = {
    id: user.id,
  };

  const token =
    "Bearer " + jwt.sign(payload, process.env.SECRET, { expiresIn: "7d" });
  return token;
};

export default issueJwt;
