import _ from 'lodash';
import moment from 'moment';
import { Error } from '../../dto';

export default () => async (req, res, next) => {
  const userAction = _.get(res, 'locals.decodedToken.userAction');
  if (_.isNil(userAction)) {
    const model = Error.DTO(
      Error.CODE_VALIDATION_ERROR,
      Error.ECODE_CORRUPTED_TOKEN,
      Error.MSG_CORRUPTED_TOKEN
    );
    next(model);
    return;
  }
  if (moment().isAfter(userAction)) {
    const model = Error.DTO(
      Error.CODE_AUTHORIZATION_ERROR,
      Error.ECODE_LOGIN_REQUIRED,
      Error.MSG_LOGIN_REQUIRED
    );
    next(model);
    return;
  }
  next();
};
