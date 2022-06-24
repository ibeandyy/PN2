import { oneLine } from "common-tags";
import { MessageEmbed } from "discord.js";
import cloneDeep from "lodash.clonedeep";
import { Base } from "./Base";
import { Fighter } from "./Fighter";
import { formatPercent, GREEN, inlineCode, random, RED } from "./utils";


/** 
 * Skill is used in the battle which the player will experience boost or any
 * kind of advantage during battle. 
 * */
export abstract class Skill extends Base {
  /** Skill description */
  abstract description: string; 
  /** Frequency of Skill being activated during battle in percentage */
  interceptRate = 0.2;
  /** Image to represent this skill */
  imageUrl?: string;

  /** 
   * Mutates fighter's attributes during battle
   * @returns {MessageEmbed} The embed will be shown during battle.
   * */
  abstract use(player: Fighter, opponent: Fighter): MessageEmbed;

  /** Clean up or remove any attribute changes before next round */
  abstract close(player: Fighter, opponent: Fighter): void;

  /** Returns true if skill is activated */
  intercept() {
    return random.bool(this.interceptRate);
  }

  /** Sets the skill to player */
  setOwner(player: Fighter) {
    player.skill = this;
  }

  /** MessageEmbed that represents Skill */
  show() {
    const interceptRate = formatPercent(this.interceptRate);
    const embed = new MessageEmbed()
      .setTitle("Skill")
      .setColor(GREEN)
      .addField("Name", this.name)
      .addField("Intercept Rate", inlineCode(interceptRate),true)
      .addField("Description", this.description)

    if (this.imageUrl)
      embed.setThumbnail(this.imageUrl);

    return embed;
  }
}

/** Skill example */
export class Rage extends Skill {
  name = "Rage";
  id = "rage";
  description = "Does double damage";

  use(p1: Fighter, p2: Fighter) {
    p1.attack *= 2;

    const embed = new MessageEmbed()
      .setTitle("Skill interception")
      .setColor(GREEN)
      .setDescription(
        oneLine`${p1.name} uses **${this.name} Skill** and increases their
        strength to ${inlineCode(p1.attack)}!`
      )

    if (this.imageUrl)
      embed.setThumbnail(this.imageUrl);

    return embed;
  }

  close(p1: Fighter, p2: Fighter) {
    p1.attack /= 2;
  }
}

export class Swashbuckle extends Skill {
  name = "Swashbuckle";
  id = "swashbuckle";
  description = "Does 25 damage";
  imageUrl = "https://cdn.discordapp.com/attachments/983738763668770878/983766541399097424/6F4F6F18-ADE7-4414-BC72-10415325DA3B.png";

  use(p1: Fighter, p2: Fighter) {
    p2.hp -= 25;

    const embed = new MessageEmbed()
      .setTitle("Swashbuckle Activated!")
      .setColor(GREEN)
      .setDescription(
        oneLine`${p1.name} uses **${this.name}** and deals 25 damage to ${inlineCode(p2.name)}!`
      )

    if (this.imageUrl)
      embed.setThumbnail(this.imageUrl);

    return embed;
  }

  close(p1: Fighter, p2: Fighter) {
    //p1.attack /= 2;
  }
}
export class Crush extends Skill {
  name = "Crush";
  id = "crush";
  description = "Does 1000 damage";
  fighters: any;
  playerDiedText: any;
  onFighterDead: any;
  msg: any;
  interceptRate = 1;

  use(p1: Fighter, p2: Fighter) {
    p2.hp -= 1000;

    const embed = new MessageEmbed()
      .setTitle("Crush Activated!")
      .setColor(RED)
      .setDescription(
        oneLine`${p1.name} uses **${this.name}** and CRUSHES ${p2.name}!`
      )

    if (this.imageUrl)
      embed.setThumbnail(this.imageUrl);

    return embed;
  }

  close(p1: Fighter, p2: Fighter) {
    //p1.attack /= 1000;
  }
}
export class Bite extends Skill {
  name = "Bite";
  id = "bite";
  description = "Does 50 damage";
  fighters: any;
  playerDiedText: any;
  onFighterDead: any;
  msg: any;
  interceptRate = 0.25;

  use(p1: Fighter, p2: Fighter) {
    p2.hp -= 50;

    const embed = new MessageEmbed()
      .setTitle("Bite Activated!")
      .setColor(RED)
      .setDescription(
        oneLine`${p1.name} uses **${this.name}** and BITES ${p2.name} for 50 damage!`
      )

    if (this.imageUrl)
      embed.setThumbnail(this.imageUrl);

    return embed;
  }

  close(p1: Fighter, p2: Fighter) {
    //p1.attack /= 3;
  }
}
export class Rally extends Skill {
  name = "Rally";
  id = "rally";
  description = "Heals 25 hit points";
  fighters: any;
  playerDiedText: any;
  onFighterDead: any;
  msg: any;
  interceptRate = 0.1;

  use(p1: Fighter, p2: Fighter) {
    p1.hp += 25;

    const embed = new MessageEmbed()
      .setTitle("Rally Activated!")
      .setColor(RED)
      .setDescription(
        oneLine`${p1.name} uses **${this.name}** and heals 25 hp!`
      )

    if (this.imageUrl)
      embed.setThumbnail(this.imageUrl);

    return embed;
  }

  close(p1: Fighter, p2: Fighter) {
  }
}
export class Disarm extends Skill {
  name = "Disarm";
  id = "disarm";
  description = "Removes all weapons from opponents";
  fighters: any;
  playerDiedText: any;
  onFighterDead: any;
  msg: any;
  interceptRate = 0.3;

  use(p1: Fighter, p2: Fighter) {

    if (p2.equippedWeapons.length > 0){

      var weaponAttack = 0;
      p2.equippedWeapons.forEach(x => weaponAttack += x.attack);
      p2.attack -= weaponAttack;

      p2.equippedWeapons = [];

      const embed = new MessageEmbed()
        .setTitle("Disarm Activated!")
        .setColor(RED)
        .setDescription(
          oneLine`${p1.name} uses **${this.name}** and disarms ${p2.name} of ALL weapons!`
        )
  
      if (this.imageUrl)
        embed.setThumbnail(this.imageUrl);
  
      return embed;

    }
    else {

      const embed = new MessageEmbed()
      .setTitle("Disarm Activated!")
      .setColor(RED)
      .setDescription(
        oneLine`${p1.name} uses **${this.name}** and tries to disarm ${p2.name}, but ${p2.name} already has no weapons!`
      )

    if (this.imageUrl)
      embed.setThumbnail(this.imageUrl);

    return embed;


    }
  }

  close(p1: Fighter, p2: Fighter) {
  }
}
export class Demoralize extends Skill {
  name = "Demoralize";
  id = "demoralize";
  description = "Removes skill and lowers attack and defense for the round";
  fighters: any;
  playerDiedText: any;
  onFighterDead: any;
  msg: any;
  interceptRate = 0.1;

  use(p1: Fighter, p2: Fighter) {

    if (p2.equippedWeapons.length > 0){

      p2.equippedWeapons = [];

      const embed = new MessageEmbed()
        .setTitle("Disarm Activated!")
        .setColor(RED)
        .setDescription(
          oneLine`${p1.name} uses **${this.name}** and disarms ${p2.name}!`
        )
  
      if (this.imageUrl)
        embed.setThumbnail(this.imageUrl);
  
      return embed;

    }
    else {

      const embed = new MessageEmbed()
      .setTitle("Disarm Activated!")
      .setColor(RED)
      .setDescription(
        oneLine`${p1.name} uses **${this.name}** and tries to disarm ${p2.name}, but ${p2.name} already has no weapons!`
      )

    if (this.imageUrl)
      embed.setThumbnail(this.imageUrl);

    return embed;


    }
  }

  close(p1: Fighter, p2: Fighter) {
  }
}
