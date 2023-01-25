const nodemailer = require('nodemailer');

module.exports.emailRegistration = async (data) => {
  console.log('DATA de Email Registration', data);

  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    pool: true,
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: true, // use TLS
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  // Información del EMAIL

  const info = await transport.sendMail({
    from: '"ADMINISTRADOR de STARTER" <admin@mareklaz.es> ',
    to: email,
    subject: 'STARTER, activa tu cuenta',
    text: 'Confirma la activación de tu cuenta en STARTER',
    html: `
    <p>Hola ${name}, activa tu cuenta en STARTER</p>
    <p>Para activar tu cuenta en STARTER debes confirmarlo pulsando en el siguiente enlace</p>

    <a href="${process.env.URL_FRONTEND}/activation/${token}">Activar cuenta</a>

    `,
  });
};

module.exports.emailRestorePassword = async (data) => {
  console.log('DATA de Email Registration', data);

  const { email, name } = data;

  const transport = nodemailer.createTransport({
    pool: true,
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: true, // use TLS
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  // Información del EMAIL

  const info = await transport.sendMail({
    from: '"Administrador de STARTER" <info@starter.com> ',
    to: email,
    subject: 'STARTER, restablece tu contraseña',
    text: 'Confirma la activación de tu cuenta en STARTER',
    html: `
    <p>Hola ${name}, reastablece tu contraseña en STARTER</p>
    <p>Para restablecer tu con contraseña en STARTER debes acceder al siguiente enlace</p>

    <p>Si no has solicitado activar tu usuario, ignora este correo.</p>
    `,
  });
};
