const crypto = require('crypto');

exports.checkAccess = (user, file) => {
  return (
    user.role.toLowerCase() === file.requiredRole.toLowerCase() &&
    user.department.toLowerCase() === file.requiredDepartment.toLowerCase()
  );
};

exports.encrypt = (data) => {
  const key = crypto.randomBytes(32);
  const iv = Buffer.alloc(16, 0);

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return {
    encryptedData: encrypted,
    key: key.toString('hex')
  };
};

exports.decrypt = (encryptedData, keyHex) => {
  const key = Buffer.from(keyHex, 'hex');
  const iv = Buffer.alloc(16, 0);

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};