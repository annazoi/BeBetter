import { UserService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "src/schemas/user.schema";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(query: any): Promise<(import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
