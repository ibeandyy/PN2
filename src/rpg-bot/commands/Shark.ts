import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Battle } from "../../Battle";
import { Bite, Rally } from "../../Skill";
import { Fighter } from "../../Fighter";
import { powerUpCheck } from "../../RoleChecks";

export default class extends Command {
  name = "shark";

  async exec(msg: Message, args: string[]) {

    const author = powerUpCheck(msg.member);
    const allies = msg.mentions.members?.map(member => powerUpCheck(member));

    const boss = new Fighter("Shark");
    boss.hp = 1000;
    boss.attack = 50;
    boss.critChance = 0.2;
    boss.imageUrl = "https://cdn.discordapp.com/attachments/983738763668770878/983739856389820506/419B904A-1A51-41CD-99A2-BABDDB9FE71A.png";
    boss.skill = new Bite();
    if (allies === undefined) {
      return 0;
    }
    else if (allies.length < 3) {
      const battle = new Battle(msg, [boss, author, ...allies]);  
      battle.setBoss(boss);
      battle.levelUpShark = true;
      console.log(battle.levelUpShark);
      console.log(author.sharkLevel);
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