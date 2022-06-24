import { MessageEmbed } from "discord.js";
import { Base } from "./Base";
import { Player } from "./Player";
import { inlineCode, SILVER } from "./utils";


/** 
 * Abstract weapon class to be used to increase Fighter's attack attribute. To
 * add your own weapon, extend Weapon class and change the attributes to your
 * liking.
 *
 * ```typescript
 * class Sword extends Weapon {
 *    name = "sword";
 *    id = "sword";
 *    attack = 15;
 * }
 * ```
 * */
export abstract class Weapon extends Base {
  /** References Player who owns this weapon */
  owner?: Player;
  /** Weapon image */
  imageUrl?: string;

  /** Attack attribute to be added when player equip this weapon */
  attack = 10;

  /** MessageEmbed that represents Weapon */
  show() {

    const embed = new MessageEmbed()
      .setTitle("Weapon")
      .setColor(SILVER)
      .addField("Name", this.name, true)
      .addField("Attack", inlineCode(this.attack), true)

    if (this.imageUrl)
      embed.setThumbnail(this.imageUrl);

    return embed;
  }
}

/** Weapon example */
export class Sword extends Weapon {
  name = "sword";
  id = "sword";
  attack = 15;
}
export class IronCutlass extends Weapon {
  name = "Iron Cutlass";
  id = "iron_cutlass";
  attack = 10;
  imageUrl = "https://cdn.discordapp.com/attachments/983738763668770878/983739980050485248/2109586C-D95E-47B1-8FEE-E2DBE39F14DE.png";
}
export class FlintlockMusket extends Weapon {
  name = "Flintlock Musket";
  id = "flintlock_musket";
  attack = 20;
  imageUrl = "https://cdn.discordapp.com/attachments/983738763668770878/983752912457060412/A32C716B-CDA7-46E7-85DA-52FA87985F7A.png";
}
export class Cannon extends Weapon {
  name = "Cannon";
  id = "cannon";
  attack = 50;
}
export class Dagger extends Weapon {
  name = "Dagger";
  id = "dagger";
  attack = 5;
}