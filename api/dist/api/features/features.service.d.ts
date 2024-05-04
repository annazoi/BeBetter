import { CreateFeatureDto } from "./dto/create-feature.dto";
import { UpdateFeatureDto } from "./dto/update-feature.dto";
export declare class FeatureService {
    create(createFeatureDto: CreateFeatureDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFeatureDto: UpdateFeatureDto): string;
    remove(id: number): string;
}
