import { MessageEmbed } from "discord.js";
import { Base } from "./Base";
import { Player } from "./Player";
import { formatPercent, inlineCode, SILVER } from "./utils";


/** 
 * Abstract armor class to be used to increase Fighter's armor attribute. To add
 * your own armor, extend Armor class and change the attributes to your liking.
 *
 * ```typescript
 * class Chest extends Armor {
 *    name = "chest";
 *    id = "chest";
 *    armor = 0.08; // 8%
 * }
 * ```
 * */
export abstract class Armor extends Base {
  /** References Player who owns this armor */
  owner?: Player;
  /** Armor image */
  imageUrl?: string;
  /** 
   * Armor's effectiveness in the form of percentage. 
   * The percentage represents how much of damage will be blocked when opponent
   * attacks you.
   * */
  armor = 0.05;

  /** MessageEmbed that represents Armor */
  show() {
    const armorRate = formatPercent(this.armor);

    const embed = new MessageEmbed()
      .setTitle("Armor")
      .setColor(SILVER)
      .addField("Name", this.name, true)
      .addField("Armor", inlineCode(armorRate), true)

    if (this.imageUrl)
      embed.setThumbnail(this.imageUrl);

    return embed;
  }
}

/** Armor example */
export class Chest extends Armor {
  name = "chest";
  id = "chest";
  armor = 0.08;
}
export class LeatherArmor extends Armor {
  name = "Leather Armor";
  id = "leather_armor";
  armor = 0.2;
  imageUrl = "https://cdn.discordapp.com/attachments/983738763668770878/983758196629966868/1990EF7A-AF45-4E8D-BF95-36AB8B30E6B6.png";
}
export class LeatherBreeches extends Armor {
  name = "Leather Breeches";
  id = "leather_breeches";
  armor = 0.1;
}
export class LeatherBoots extends Armor {
  name = "Leather Boots";
  id = "leather_boots";
  armor = 0.07;
}
export class LeatherGloves extends Armor {
  name = "Leather Gloves";
  id = "leather_gloves";
  armor = 0.05;
}