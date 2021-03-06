import { ERROR_CODES, EXTENDED_ERROR_CODES, ERROR_MSG } from '../../constants';

/** DTO representing an error on server
 * @namespace Error
 * @alias Error
 * @memberof module:DataTransferObject
 * @property {number} code HTTP error code
 * @property {number} ecode Extended error code
 * @property {string} message Error message
 */
const DTO = (code, ecode, message) => {
  return {
    code,
    ecode,
    message
  };
};

const Builder = {
  UNKNOWN: msg => DTO(ERROR_CODES.CODE_SERVER_ERROR, EXTENDED_ERROR_CODES.ECODE_UNKNOWN_ERROR, msg),
  ITEM_NOT_FOUND: DTO(
    ERROR_CODES.CODE_LOGIC_ERROR,
    EXTENDED_ERROR_CODES.ECODE_ITEM_NOT_FOUND,
    ERROR_MSG.MSG_ITEM_NOT_FOUND
  ),
  INVALID_PASSWORD: DTO(
    ERROR_CODES.CODE_AUTHORIZATION_ERROR,
    EXTENDED_ERROR_CODES.ECODE_INVALID_PASSWORD,
    ERROR_MSG.MSG_INVALID_PASSWORD
  ),
  INVALID_TOKEN: DTO(
    ERROR_CODES.CODE_AUTHORIZATION_ERROR,
    EXTENDED_ERROR_CODES.ECODE_INVALID_TOKEN,
    ERROR_MSG.MSG_INVALID_TOKEN
  ),
  VALIDATION: msg =>
    DTO(ERROR_CODES.CODE_VALIDATION_ERROR, EXTENDED_ERROR_CODES.ECODE_VALIDATION_ERROR, msg),
  CORRUPTED_TOKEN: DTO(
    ERROR_CODES.CODE_VALIDATION_ERROR,
    EXTENDED_ERROR_CODES.ECODE_CORRUPTED_TOKEN,
    ERROR_MSG.MSG_CORRUPTED_TOKEN
  ),
  EXPIRED_TOKEN: DTO(
    ERROR_CODES.CODE_AUTHORIZATION_ERROR,
    EXTENDED_ERROR_CODES.ECODE_LOGIN_REQUIRED,
    ERROR_MSG.MSG_LOGIN_REQUIRED
  ),
  DATABASE: msg =>
    DTO(ERROR_CODES.CODE_SERVER_ERROR, EXTENDED_ERROR_CODES.ECODE_DATABASE_ERROR, msg),
  DUPLICATED: DTO(
    ERROR_CODES.CODE_AUTHORIZATION_ERROR,
    EXTENDED_ERROR_CODES.ECODE_DUPLICATED_ITEM,
    ERROR_MSG.MSG_DUPLICATED_ITEM
  ),
  INVITED_USER: DTO(
    ERROR_CODES.CODE_LOGIC_ERROR,
    EXTENDED_ERROR_CODES.ECODE_USER_ALREADY_INVITED,
    ERROR_MSG.MSG_USER_ALREADY_INVITED
  ),
  ALREADY_FOLLOWING: DTO(
    ERROR_CODES.CODE_LOGIC_ERROR,
    EXTENDED_ERROR_CODES.ECODE_USER_ALREADY_FOLLOWING,
    ERROR_MSG.MSG_USER_ALREADY_FOLLOWING
  ),
  NOTIFICATION_ALREADY_REDEEMED: DTO(
    ERROR_CODES.CODE_LOGIC_ERROR,
    EXTENDED_ERROR_CODES.ECODE_NOTIFICATION_ALREADY_REDEEMED,
    ERROR_MSG.MSG_NOTIFICATION_ALREADY_REDEEMED
  ),
  INVALID_ENDPOINT: DTO(
    ERROR_CODES.CODE_LOGIC_ERROR,
    EXTENDED_ERROR_CODES.ECODE_INVALID_ENDPOINT,
    ERROR_MSG.MSG_INVALID_ENDPOINT
  )
};

export default Builder;
