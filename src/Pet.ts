import { oneLine } from "common-tags";
import { MessageEmbed } from "discord.js";
import { Base } from "./Base";
import { Fighter } from "./Fighter";
import { bold, BROWN, formatPercent, inlineCode, random } from "./utils";


/** 
 * Pet is a companion for Player which can be used in a battle. Pet will attack
 * during battle based on it's own attribute. To add your own pet, extend Pet
 * class and change the attributes to your liking.
 *
 * ```typescript
 *
 * export class Dragon extends Pet {
 *   name = "dragon";
 *   id = "dragon";
 *   attack = 20;
 *   interceptRate = 0.4;
 * }
 * ```
 * */
export abstract class Pet extends Base {
  /** Pet's owner name */
  ownerName: string = "";
  /** Image to represent this Pet */
  imageUrl?: string;
  /** Frequency to intercept and attack in battle in the form of percentage */
  interceptRate = 0.05;
  /** Damage dealt when attack */
  attack = 5;
  /** Can pet eat other pets */
  canEat: boolean = false;
  /** Amount of healing the pet provides */
  healing = 0;

  /** Returns true if intercept */
  isIntercept() {
    return random.bool(this.interceptRate);
  }

  /** Sets the pet ownership */
  setOwner(player: Fighter) {
    player.pet = this;
    this.ownerName = player.name;
    player.hasPet = true;
  }

    /** MessageEmbed that represents having no Pet */
    no() {
      const interceptRate = formatPercent(this.interceptRate);
      const embed = new MessageEmbed()
        .setTitle("Pet")
        .setColor(BROWN)
        .addField("Sorry", "you do not have a pet.....yet.", true)
  
      return embed;
    }

  /** MessageEmbed that represents Pet */
  show() {
    const interceptRate = formatPercent(this.interceptRate);
    const embed = new MessageEmbed()
      .setTitle("Pet")
      .setColor(BROWN)
      .addField("Name", this.name, true)
      .addField("Intercept Rate", inlineCode(interceptRate), true)
      .addField("Attack", inlineCode(this.attack), true)

    if (this.imageUrl)
      embed.setThumbnail(this.imageUrl);

    return embed;
  }

  /** Action to take by Pet when in Battle */
  intercept(opponent: Fighter, player: Fighter) {

    const armorProtection = opponent.armor * this.attack;
    const damageDealt = this.attack - armorProtection;

    opponent.hp -= damageDealt;

    if (this.canEat == true && opponent.pet != undefined) {
      opponent.pet = undefined;
      const embed = new MessageEmbed()
      .setTitle("Pet Double Attack")
      .setColor(BROWN)
      .setDescription(
        oneLine`${this.ownerName}'s ${this.name} ATTACKS ${opponent.name} for
        ${bold(Math.round(damageDealt))} damage and eats his poor pet!`
      );

    if (this.imageUrl) 
      embed.setThumbnail(this.imageUrl);

    return embed;

    }
    else if (this.healing > 0) {

      player.hp += this.healing;
      const embed = new MessageEmbed()
      .setTitle("Pet Heal")
      .setColor(BROWN)
      .setDescription(
        oneLine`${this.ownerName}'s ${this.name} HEALS ${this.ownerName} for
        ${bold(Math.round(this.healing))} Hit Points!`
      );

    if (this.imageUrl) 
      embed.setThumbnail(this.imageUrl);

    return embed;
    }
    else {
      //const armorProtection = opponent.armor * this.attack;
      //const damageDealt = this.attack - armorProtection;
  
      opponent.hp -= this.attack;
      const embed = new MessageEmbed()
      .setTitle("Pet Attack")
      .setColor(BROWN)
      .setDescription(
        oneLine`${this.ownerName}'s ${this.name} ATTACKS ${opponent.name} for
        ${bold(Math.round(damageDealt))} damage!`
      );

    if (this.imageUrl) 
      embed.setThumbnail(this.imageUrl);

    return embed;
    }    
  }
}

/** Pet example */
export class Dragon extends Pet {
  name = "dragon";
  id = "dragon";
  attack = 20;
  interceptRate = 0.4;
}
export class Parrot extends Pet {
  name = "Parrot";
  id = "parrot";
  attack = 15;
  interceptRate = 0.2;
  imageUrl = "https://cdn.discordapp.com/attachments/983738763668770878/983740911706054686/0E6FBFF0-E020-440E-B690-D3A4EDF38786.png";
}
export class Raven extends Pet {
  name = "Raven";
  id = "raven";
  healing = 15 ;
  attack = 0;
  interceptRate = 0.2;
  imageUrl = "https://cdn.discordapp.com/attachments/976567510147162183/984309369682395156/ED58E2C0-EBB6-43AF-A3C8-D2B6CC396FCE.png";
}
export class Doge extends Pet {
  name = "Doge";
  id = "doge";
  attack = 20;
  interceptRate = 1;
  canEat = true;
  //imageUrl = "https://cdn.discordapp.com/attachments/983738763668770878/983740911706054686/0E6FBFF0-E020-440E-B690-D3A4EDF38786.png";
}
export class Dead extends Pet {
  name = "Dead";
  id = "dead";
  attack = 0;
  healing = 0;
  interceptRate = 0;
  canEat = false;
}

