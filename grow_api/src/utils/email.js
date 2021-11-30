module.exports = (settings, message) => {

    if (!settings) throw new Error(`The settings object is required to send e-mails!`);

    if (!settings.sendGridKey ||
        !settings.email)
        throw new Error(`The SendGrid settings are required to send e-mails!`);

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(settings.sendGridKey);

    const msg = {
        to: settings.email,
        from: settings.email,
        subject: 'Beholder has a message for you!',
        text: message
    }

    return sgMail.send(msg);
}