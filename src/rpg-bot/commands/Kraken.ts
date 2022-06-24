import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Battle } from "../../Battle";
import { Crush, Rally } from "../../Skill";
import { Fighter } from "../../Fighter";
import { powerUpCheck } from "../../RoleChecks";

export default class extends Command {
  name = "kraken";

  async exec(msg: Message, args: string[]) {

    const author = powerUpCheck(msg.member);
    const allies = msg.mentions.members?.map(member => powerUpCheck(member));

    const boss = new Fighter("The Kraken");
    boss.hp = 2000;
    boss.attack = 100;
    boss.critChance = 0.4;
    boss.imageUrl = "https://cdn.discordapp.com/attachments/983738763668770878/983738999157981264/island_assets_final_v4_seamonsters_kraken.png";
    boss.skill = new Crush();
    if (allies === undefined) {
      return 0;
    }
    else if (allies.length < 10) {
      const battle = new Battle(msg, [boss, author, ...allies]);  
      battle.setBoss(boss);
      battle.levelUpKraken = true;
      console.log(battle.levelUpKraken);
      console.log(author.krakenLevel);
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