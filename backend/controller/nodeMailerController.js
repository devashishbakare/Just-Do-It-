const nodeMailer = require("../config/nodemailer");
const ejs = require("ejs");

const sendMailOnPlaceOrder = (orderDetail, userEmailAddress) => {
  let htmlPage = nodeMailer.renderTemplate(
    { order: orderDetail },
    "/placeOrder.ejs"
  );

  //sending mails
  nodeMailer.transporter.sendMail(
    {
      from: "manageincident@gmail.com",
      to: userEmailAddress,
      subject: "Your order has been placed!!",
      html: htmlPage,
    },
    function (err, info) {
      if (err) {
        console.log("error in sending mail", err);
        return false;
      }
      console.log("massage has been sent ", info);
      return true;
    }
  );
};

const sendMailOnCancleOrder = (orderDetail, userEmailAddress) => {
  let htmlPage = nodeMailer.renderTemplate(
    { order: orderDetail },
    "/cancleOrder.ejs"
  );

  //sending mails
  nodeMailer.transporter.sendMail(
    {
      from: "manageincident@gmail.com",
      to: userEmailAddress,
      subject: "Your order has been cancle successfully.",
      html: htmlPage,
    },
    function (err, info) {
      if (err) {
        console.log("error in sending mail", err);
        return false;
      }
      console.log("massage has been sent", info);
      return true;
    }
  );
};
module.exports = { sendMailOnPlaceOrder, sendMailOnCancleOrder };
