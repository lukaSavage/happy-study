/**
 * @description 成功/失败类
 */

class BaseModal {
  constructor({ errCode, data, message }) {
    this.errCode = errCode;
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

class SuccessModal extends BaseModal {
  constructor({ errCode, data = {} }) {
    super({
      errCode,
      data
    });
  }
}

class ErrorModal extends BaseModal {
  constructor({ errCode, message = '' }) {
    super({
      errCode,
      message
    });
  }
}

module.exports = {
  SuccessModal,
  ErrorModal
}