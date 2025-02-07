import { UpdateUserDto } from "./dto/update-user.dto";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    findAll(query?: any): Promise<(import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
