import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Battle } from "../../Battle";
import { Rally } from "../../Skill";
import { Fighter } from "../../Fighter";
import { powerUpCheck } from "../../RoleChecks";

export default class extends Command {
  name = "sailor";

  async exec(msg: Message, args: string[]) {

    const author = powerUpCheck(msg.member);
    const allies = msg.mentions.members?.map(member => powerUpCheck(member));

    const boss = new Fighter("Navy Sailor");
    boss.hp = 500;
    boss.attack = 40;
    boss.critChance = .40;
    boss.imageUrl = "https://cdn.discordapp.com/attachments/983738763668770878/983762268053442640/EF84F00B-0069-4D59-BC29-2399B05DA9CC.png";
    boss.skill = new Rally();
    if (allies === undefined) {
      return 0;
    }
    else if (allies.length < 1) {
      const battle = new Battle(msg, [boss, author]);  
      battle.setBoss(boss);
      battle.levelUpSailor = true;
      if (msg.member) {
        await battle.run(msg.member);
      } 
    } 
    else {
    const battle = new Battle(msg, [boss, author, ...allies]);
    battle.setBoss(boss);
    if (msg.member) {
      await battle.run(msg.member);
    }
   }
  }
}
