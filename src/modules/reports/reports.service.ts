import { Injectable } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import { FeedsRepository } from '../feeds/feeds.repository';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly feedsRepository: FeedsRepository,
  ) {}

  async create(createReportDto: CreateReportDto, reporterId: number) {
    const report = await this.reportsRepository.create({
      feed_id: createReportDto.feed_id,
      reporter_id: reporterId,
    });

    const reportCount = await this.reportsRepository.countUniqueReports(
      createReportDto.feed_id,
    );

    if (reportCount >= 3) {
      await this.feedsRepository.update(createReportDto.feed_id, {
        is_hidden: true,
      });
    }

    return report;
  }
}
