import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { powerUpCheck } from "../../RoleChecks";
import { SILVER } from "../../utils";



export default class WeaponCommand extends Command {
  name = "weapons";
  aliases = [];

  async exec(msg: Message, args: string[]) {

    const author = powerUpCheck(msg.member);
    if (author.equippedWeapons.length > 0){
      const equippedWeapons = author.equippedWeapons
      equippedWeapons.forEach(function (weapon){
          const weaponEmbed = weapon.show()
          msg.channel.send({ embeds: [weaponEmbed] });
      });
    }
    else {
      const embed = new MessageEmbed()
        .setTitle("Weapons")
        .setColor(SILVER)
        .addField("Sorry", "you do not have any weapons.....yet.", true)
  
      //return embed;
      msg.channel.send({ embeds: [embed] });
    }
  }
}