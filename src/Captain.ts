import { User } from "discord.js";
import { Fighter } from "./Fighter";

/** 
 * Captain extends Fighter and it used to easily create Fighter class based on
 * discord.js User.
 * */
export class Captain extends Fighter {
  id: string;
  attack = 10;
  hp = 200;
  armor = 0.05;
  critChance = 0.2;
  critDamage = 1.5;
  user: User;

  /** Creates Captain instance from User */
  constructor(user: User) {
    super(user.username);
    this.user = user;
    this.id = user.id;
    this.imageUrl = this.user.displayAvatarURL();
  }
}
