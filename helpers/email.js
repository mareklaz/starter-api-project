const nodmailer = require('nodemailer');

module.exports.emailRegistration = async (data) => {
  console.log('DATA de Email Registration', data);

  const { email, name } = data;

  const transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: 465,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  // Información del EMAIL

  const info = await transport.sendMail({
    from: '"Administrador de STARTER" <info@starter.com> ',
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

  const { email, name, token } = data;

  const transport = nodmailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
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

    <p>Si no has solicitado activar tu usuario, puedes ignorar este correo.</p>
    `,
  });
};
