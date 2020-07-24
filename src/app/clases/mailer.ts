const nodemailer = require("nodemailer");

export class Mailer{

    
    transporter;
    constructor(){

        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure:false,
            auth: {
                user: 'harley.white@ethereal.email',
                pass: 'CVNdDvXSpfxtE8E3ZR'
            }
        });

        
    }

    async sendMail(email:string){
        let info = await this.transporter.sendMail({
            from: '"Harley 👻" <harley.white@ethereal.email>', // sender address
            to: "fernandezluisn@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });
        
          console.log("Message sent: %s", info.messageId);
    }

    
}