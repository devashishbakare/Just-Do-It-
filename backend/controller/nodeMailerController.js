const nodeMailer = require("../config/nodemailer");

const sendMailOnPlaceOrder = (orderDetails, userEmailAddress) => {
  console.log("we are in node_cotroller in placing order");
  let htmlPage = nodeMailer.renderTemplate(
    { orders: orderDetails },
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

const sendMailOnCancleOrder = (orderDetails, userEmailAddress) => {
  console.log("we are in node_cotroller in placing order");
  let htmlPage = nodeMailer.renderTemplate(
    { order: orderDetails },
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
