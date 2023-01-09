const nodmailer = require('nodemailer');

module.exports.emailRegistration = async (data) => {
  console.log('DATA de Email Registration', data);

  const { email, name } = data;

  // const transport = nodmailer.createTransport({
  //   host: 'smtp.mailtrap.io',
  //   port: 2525,
  //   auth: {
  //     user: 'af5c6341b7606f',
  //     pass: '17ed610a010dc1',
  //   },
  // });

  const transport = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: 465,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Información del EMAIL
  {
    /* <a href='${process.env.URL_FRONTEND}/activation/${token}'>Activar cuenta</a>; */
  }
  const info = await transport.sendMail({
    from: '"Administrador de STARTER" <info@starter.com> ',
    to: email,
    subject: 'STARTER, activa tu cuenta',
    text: 'Confirma la activación de tu cuenta en STARTER',
    html: `
    <p>Hola ${name}, activa tu cuenta en STARTER</p>
    <p>Para activar tu cuenta en STARTER debes confirmarlo pulsando en el siguiente enlace</p>

    

    <p>Si no has solicitado activar tu usuario, puedes ignorar este correo.</p>
    `,
  });
};

// module.exports.emailRestorePassword = async (data) => {
//   console.log('DATA de Email Registration', data);

//   const { email, name, token } = data;

//   const transport = nodmailer.createTransport({
//     host: process.env.GMAIL_HOST,
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.GMAIL_USER,
//       pass: process.env.GMAIL_PASS,
//     },
//   });

//   // Información del EMAIL

//   const info = await transport.sendMail({
//     from: '"Administrador de STARTER" <info@tortilleria.com> ',
//     to: email,
//     subject: 'STARTER, activa tu cuenta',
//     text: 'Confirma la activación de tu cuenta en STARTER',
//     html: `
//     <p>Hola ${name}, activa tu cuenta en STARTER</p>
//     <p>Para activar tu cuenta en STARTER debes confirmarlo pulsando en el siguiente enlace</p>

//     <a href="${process.env.URL_FRONTEND}/activation/${token}">Activar cuenta</a>

//     <p>Si no has solicitado activar tu usuario, puedes ignorar este correo.</p>
//     `,
//   });
// };
