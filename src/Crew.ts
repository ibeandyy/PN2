import { oneLine } from "common-tags";
import { MessageEmbed } from "discord.js";
import { Base } from "./Base";
import { Fighter } from "./Fighter";
import { bold, BROWN, formatPercent, inlineCode, random } from "./utils";



export abstract class Crew extends Base {
  /** Pet's owner name */
  ownerName: string = "";
  /** Image to represent this Pet */
  imageUrl?: string;
  /** Crew Level */
  level = 0;

}    


