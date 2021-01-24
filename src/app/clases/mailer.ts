const nodemailer = require("nodemailer");

export class Mailer{

    
    transporter;
    constructor(){

       

        
    }

    async sendMail(email:string){
        let info = await this.transporter.sendMail({
            from: '"Clinica 1990 👻" <clinica1990@gmail.com>', // sender address
            to: "fernandezluisn@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });
        
          console.log("Message sent: %s", info.messageId);
    }

    
}