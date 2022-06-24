import { Command } from "@jiman24/commandment";
import { GuildMember, Message } from "discord.js";
import { powerUpCheck } from "../../RoleChecks";

export default class Compare extends Command {
  name = "compare";
  aliases = ["c"];

  async exec(msg: Message, args: string[]) {

    const mentionedMember = msg.mentions.members?.first() as GuildMember;
    
    const player = powerUpCheck(msg.member);
    const allies = powerUpCheck(mentionedMember);

    if (player !== undefined && msg.member !== null){

      msg.channel.send({ embeds: [player.show(allies)] });    
    }
    else {
        return msg.channel.send("Please mention an opponent to compare to ye!");
    }
  }
}