import { FeatureService } from "./features.service";
import { CreateFeatureDto } from "./dto/create-feature.dto";
import { UpdateFeatureDto } from "./dto/update-feature.dto";
export declare class FeatureController {
    private readonly featureService;
    constructor(featureService: FeatureService);
    create(createFeatureDto: CreateFeatureDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFeatureDto: UpdateFeatureDto): string;
    remove(id: string): string;
}
