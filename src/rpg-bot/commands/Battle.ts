import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Battle } from "../../Battle";
import { powerUpCheck } from "../../RoleChecks";


export default class BattleCommand extends Command {
  name = "battle";
  aliases = ["b"];

  async exec(msg: Message, args: string[]) {

    if (msg.member !== undefined && msg.mentions.members !== null) {

      const author = powerUpCheck(msg.member);
      const opponents = msg.mentions.members.map(x => powerUpCheck(x));
  
      if (author && opponents.length > 0){

        if (opponents.length > 9) {

          const battle = new Battle(msg, [author, ...opponents]);
          battle.levelUpFFA = true;
          if (msg.member) {
            await battle.run(msg.member);
          }
        }
        else {

          const battle = new Battle(msg, [author, ...opponents]);
          if (msg.member) {
            await battle.run(msg.member);
          }
        }   
      }
      else {

        return msg.channel.send("Please mention your opponent(s)");
      }   
    }
    else {

      return msg.channel.send("Something weird went wrong!");
    }
  }
}
