import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { powerUpCheck } from "../../RoleChecks";
import { BROWN } from "../../utils";


export default class PetCommand extends Command {
  name = "pet";
  aliases = [];

  async exec(msg: Message, args: string[]) {

    const author = powerUpCheck(msg.member);
    if (author.pet){
      const pet = author.pet
      const petEmbed = pet.show();

      msg.channel.send({ embeds: [petEmbed] });
    }
    else {
      const embed = new MessageEmbed()
        .setTitle("Pet")
        .setColor(BROWN)
        .addField("Sorry", "you do not have a pet.....yet.", true)
  
      //return embed;
      msg.channel.send({ embeds: [embed] });
    }
  }
}
