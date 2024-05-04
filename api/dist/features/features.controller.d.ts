import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
export declare class FeaturesController {
    private readonly featuresService;
    constructor(featuresService: FeaturesService);
    create(createFeatureDto: CreateFeatureDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFeatureDto: UpdateFeatureDto): string;
    remove(id: string): string;
}
