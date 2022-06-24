import { Command } from "@jiman24/commandment";
import { GuildMember, Message } from "discord.js";
import { powerUpCheck, skillsPetsArmsCheck } from "../../RoleChecks";

export default class Profile extends Command {
  name = "stats";

  async exec(msg: Message, args: string[]) {

    const player = powerUpCheck(msg.member);

    if (player !== undefined && msg.member !== null){

      msg.channel.send({ embeds: [player.show()] });    
    }
    else {
      return;
    }
  }
}
