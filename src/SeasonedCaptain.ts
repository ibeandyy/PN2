import { User } from "discord.js";
import { Fighter } from "./Fighter";

/** 
 * Seasoned Captain extends Fighter and it used to easily create Fighter class based on
 * discord.js User.
 * */
export class SeasonedCaptain extends Fighter {
  id: string;
  attack = 10;
  hp = 300;
  armor = 0.1;
  critChance = 0.3;
  critDamage = 2;
  user: User;

  /** Creates Seasoned Captain instance from User */
  constructor(user: User) {
    super(user.username);
    this.user = user;
    this.id = user.id;
    this.imageUrl = this.user.displayAvatarURL();
  }
}
