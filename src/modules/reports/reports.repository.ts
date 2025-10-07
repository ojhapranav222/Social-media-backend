import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReportsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ReportUncheckedCreateInput) {
    return this.prisma.report.create({ data });
  }

  async countUniqueReports(feedId: number): Promise<number> {
    return this.prisma.report.count({
      where: {
        feed_id: feedId,
      },
    });
  }
}
