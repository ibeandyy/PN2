import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { powerUpCheck } from "../../RoleChecks";
import { GREEN } from "../../utils";


export default class SkillCommand extends Command {
  name = "skill";
  aliases = [];

  async exec(msg: Message, args: string[]) {

    const author = powerUpCheck(msg.member);
    if (author.skill){
      const skill = author.skill
      const petEmbed = skill.show();

      msg.channel.send({ embeds: [petEmbed] });
    }
    else {
      const embed = new MessageEmbed()
        .setTitle("Skill")
        .setColor(GREEN)
        .addField("Sorry", "you do not have a skill.....yet.", true)
  
      //return embed;
      msg.channel.send({ embeds: [embed] });
    }
  }
}
