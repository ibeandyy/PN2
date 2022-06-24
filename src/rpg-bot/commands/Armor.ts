import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { powerUpCheck } from "../../RoleChecks";
import { SILVER } from "../../utils";



export default class ArmorCommand extends Command {
  name = "armor";
  aliases = [];

  async exec(msg: Message, args: string[]) {

    const author = powerUpCheck(msg.member);
    if (author.equippedArmors.length > 0){
      const equippedArmors = author.equippedArmors
      equippedArmors.forEach(function (armor){
          const armorEmbed = armor.show()
          msg.channel.send({ embeds: [armorEmbed] });
      });
    }
    else {
      const embed = new MessageEmbed()
        .setTitle("Armor")
        .setColor(SILVER)
        .addField("Sorry", "you do not have any armor.....yet.", true)
  
      //return embed;
      msg.channel.send({ embeds: [embed] });
    }
  }
}