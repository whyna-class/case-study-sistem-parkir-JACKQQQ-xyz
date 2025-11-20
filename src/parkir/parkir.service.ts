import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParkirDto } from './dto/create-parkir.dto';
import { UpdateParkirDto } from './dto/update-parkir.dto';

@Injectable()
export class ParkirService {
    constructor(private prisma: PrismaService) { }


    private calculateTotal(jenis: string, durasi: number): number {
        const rates: Record<string, { first: number; next: number }> = {
            roda2: { first: 3000, next: 2000 },
            roda4: { first: 6000, next: 4000 },
        };


        if (!rates[jenis]) throw new BadRequestException('jenis_kendaraan invalid');


        if (durasi <= 1) return rates[jenis].first;
        return rates[jenis].first + (durasi - 1) * rates[jenis].next;
    }


    async create(data: CreateParkirDto) {
        const total = this.calculateTotal(data.jenisKendaraan, data.durasi);


        return this.prisma.parkir.create({
            data: {
                platNomor: data.platNomor,
                jenisKendaraan: data.jenisKendaraan,
                durasi: data.durasi,
                total,
            },
        });
    }


    async findAll() {
        return this.prisma.parkir.findMany({ orderBy: { createdAt: 'desc' } });
    }


    async findOne(id: number) {
        const rec = await this.prisma.parkir.findUnique({ where: { id } });
        if (!rec) throw new NotFoundException(`Parkir dengan id ${id} tidak ditemukan`);
        return rec;
    }


    async getTotalPendapatan() {
        const agg = await this.prisma.parkir.aggregate({
            _sum: { total: true },
        });
        return { total: agg._sum.total ?? 0 };
    }


    async remove(id: number) {
        await this.findOne(id);
        return this.prisma.parkir.delete({ where: { id } });
    }


    async updateDurasi(id: number, dto: UpdateParkirDto) {
        const rec = await this.findOne(id);
        const durasiBaru = dto.durasi ?? rec.durasi;
        const totalBaru = this.calculateTotal(rec.jenisKendaraan, durasiBaru);
        return this.prisma.parkir.update({
            where: { id },
            data: { durasi: durasiBaru, total: totalBaru },
        });
    }
}