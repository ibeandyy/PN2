import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { BROWN } from "../../utils";
import { config } from "dotenv";
import { ubbClient } from "..";



export default class BuyMusket extends Command {
    name = "buymusket";
    aliases = [];

    async exec(msg: Message, args: string[]) {

      config();
      const author = msg.member;
      const item = "Flintlock Musket";
      const role = "984201955930931270";
      const price = 20;
      var charge = 0;
      charge -= price;
      const guildID = '933037216811319327';
      if (author != null) {

        var userID = author.user.id;
        
           
        if (userID !== undefined) {
          const moneyUser = await ubbClient.getUserBalance(guildID, userID);
          if (moneyUser.cash > price && author.roles.cache.has(role) == false) {

           await ubbClient.editUserBalance(guildID, userID, { cash: charge});
           await author.roles.add(role).catch((e) => console.log(e));
           const embed = new MessageEmbed()
           .setTitle("Typho Redbeard's Marketplace")
           .setColor(BROWN)
           .addField("Thanks for yer patronage!", `You are now the proud owner of a ${item}, that'll be 1 silver!`, false)
           msg.channel.send({ embeds: [embed] });  

          }
          else if (moneyUser.cash < price && author.roles.cache.has(role) == true) {

           const embed = new MessageEmbed()
           .setTitle("Typho Redbeard's Marketplace")
           .setColor(BROWN)
           .addField("Wait just a minute!", `First off, you cannot afford a ${item}\nFurthermore, you've already got one of the finest ${item}s we offer!`, false)
           msg.channel.send({ embeds: [embed] });  

          }
          else if (moneyUser.cash < price) {

           const embed = new MessageEmbed()
           .setTitle("Typho Redbeard's Marketplace")
           .setColor(BROWN)
           .addField("Wait just a minute!", `You cannot afford a ${item}!\nMaybe do some gamblin' or stealin'...but no from me!`, false)
           msg.channel.send({ embeds: [embed] });  

          }
          else if (author.roles.cache.has(role) == true) {

           const embed = new MessageEmbed()
           .setTitle("Typho Redbeard's Marketplace")
           .setColor(BROWN)
           .addField("Wait just a minute!", `You've already got one of the finest ${item}s we offer!\nLeave some for the others!`, false)
           msg.channel.send({ embeds: [embed] });  

          }
     }

        else {
          return msg.channel.send("Something weird went wrong!"); 
        }
    }
  }
}
