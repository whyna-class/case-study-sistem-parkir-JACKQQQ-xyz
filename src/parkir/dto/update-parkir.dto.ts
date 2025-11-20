import { IsInt, Min, IsOptional } from 'class-validator';


export class UpdateParkirDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    durasi?: number;
}