import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { BROWN } from "../../utils";
import { config } from "dotenv";
import { ubbClient } from "..";
import { swashbuckle } from "../../RoleChecks";



export default class BuyRally extends Command {
    name = "buyrally";
    aliases = [];

    async exec(msg: Message, args: string[]) {

      config();
      const author = msg.member;
      const item = "Rally";
      const role = "984203254550392862";
      const swahsbuckle = "984202211221454928";
      const price = 25;
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
           if (author.roles.cache.has(swahsbuckle)) await author.roles.remove(swashbuckle).catch((e) => console.log(e));
           const embed = new MessageEmbed()
           .setTitle("Typho Redbeard's Marketplace")
           .setColor(BROWN)
           .addField("Thanks for yer patronage!", `You now know how to ${item}, that'll be 1 silver!`, false)
           msg.channel.send({ embeds: [embed] });  

          }
          else if (moneyUser.cash < price && author.roles.cache.has(role) == true) {

           const embed = new MessageEmbed()
           .setTitle("Typho Redbeard's Marketplace")
           .setColor(BROWN)
           .addField("Wait just a minute!", `First off, you cannot afford to learn how to ${item}\nFurthermore, you already know how to ${item}!`, false)
           msg.channel.send({ embeds: [embed] });  

          }
          else if (moneyUser.cash < price) {

           const embed = new MessageEmbed()
           .setTitle("Typho Redbeard's Marketplace")
           .setColor(BROWN)
           .addField("Wait just a minute!", `You cannot afford to learn how to ${item}!\nMaybe do some gamblin' or stealin'...but no from me!`, false)
           msg.channel.send({ embeds: [embed] });  

          }
          else if (author.roles.cache.has(role) == true) {

           const embed = new MessageEmbed()
           .setTitle("Typho Redbeard's Marketplace")
           .setColor(BROWN)
           .addField("Wait just a minute!", `You already know how to ${item} we offer!\nLet some others sharpen their skills!`, false)
           msg.channel.send({ embeds: [embed] });  

          }
     }

        else {
          return msg.channel.send("Something weird went wrong!"); 
        }
    }
  }
}
