import fs from "fs";
import _ from "lodash";
import { createHash } from "crypto";
import JWT from "jsonwebtoken";
import { Error } from "../../dto";

const secretKey = fs.readFileSync("./etc/keys/private.key");
const publicKey = fs.readFileSync("./etc/keys/public.pem");

const sha256 = data =>
  createHash("sha256")
    .update(data, "binary")
    .digest("base64");

const decryptJWT = async token => {
  if (_.isEmpty(token)) {
    throw Error.DTO(
      Error.CODE_AUTHORIZATION_ERROR,
      Error.ECODE_INVALID_TOKEN,
      Error.MSG_INVALID_TOKEN
    );
  }
  const data = await JWT.verify(token, publicKey, {
    algorithm: process.env.JWT_ALGORITHM
  });
  if (_.isNull(data)) {
    throw Error.DTO(
      Error.CODE_AUTHORIZATION_ERROR,
      Error.ECODE_INVALID_TOKEN,
      Error.MSG_INVALID_TOKEN
    );
  } else {
    return data;
  }
};

const encryptJWT = data =>
  JWT.sign(data, secretKey, {
    algorithm: process.env.JWT_ALGORITHM
  });

const controller = {};

controller.decodeToken = async jwt => {
  const data = await decryptJWT(jwt);
  const { email, id, addedDate, token } = data;
  const key = `${email}_${id}_${addedDate}`;
  if (_.isEqual(sha256(key), token)) {
    return data;
  }
  throw Error.DTO(
    Error.CODE_AUTHORIZATION_ERROR,
    Error.ECODE_INVALID_TOKEN,
    Error.MSG_INVALID_TOKEN
  );
};

controller.encodeToken = data => {
  const { email, id, addedDate } = data;
  const key = `${email}_${id}_${addedDate}`;
  const hashedKey = sha256(key);
  const jwtData = {
    ...data,
    token: hashedKey
  };
  return encryptJWT(jwtData);
};

export default controller;
