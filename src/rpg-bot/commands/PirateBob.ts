import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Battle } from "../../Battle";
import { Crush, Disarm, Rally } from "../../Skill";
import { Fighter } from "../../Fighter";
import { powerUpCheck } from "../../RoleChecks";
import { Doge } from "../../Pet";

export default class extends Command {
  name = "bob";

  async exec(msg: Message, args: string[]) {

    const author = powerUpCheck(msg.member);
    const allies = msg.mentions.members?.map(member => powerUpCheck(member));

    const boss = new Fighter("Pirate Bob");
    boss.hp = 1500;
    boss.armor = 0.5;
    boss.attack = 50;
    boss.critChance = 0.2;
    boss.imageUrl = "https://cdn.discordapp.com/attachments/937007718722601021/983904919247536219/istockphoto-1220287534-612x612.jpg";
    boss.skill = new Disarm();
    boss.pet = new Doge();
    boss.pet.ownerName = "Pirate Bob"
    if (allies === undefined) {
      return 0;
    }
    else if (allies.length < 10) {
      const battle = new Battle(msg, [boss, author, ...allies]);  
      battle.setBoss(boss);
      //battle.levelUpBob = true;
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