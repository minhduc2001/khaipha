import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { parse } from 'csv-parse';
import * as path from 'path';
import { Music } from '@/music/music.entity';
import { Authors } from '@/authors/authors.entity';

@Injectable()
export class MusicSeed {
  constructor(
    @InjectRepository(Music)
    protected readonly repository: Repository<Music>,
    @InjectRepository(Authors)
    protected readonly authorsRepository: Repository<Authors>,
  ) {}

  // readfile(filePath, callback) {
  //   const data = [];
  //
  //   fs.createReadStream(filePath)
  //     .pipe(parse({ delimiter: ',', from_line: 2 }))
  //     .on('data', function (row) {
  //       const dir = row[0].split('.')[0];
  //
  //       const d = {
  //         url: `genres_original/${dir}/${row[0]}`,
  //         title: row[1],
  //         artist: row[2],
  //         duration: row[4],
  //         releaseDate: row[5],
  //         album: row[6],
  //         genre: row[7],
  //         authors: row[3],
  //       };
  //
  //       data.push(d);
  //     })
  //     .on('end', function () {
  //       callback(data);
  //     })
  //     .on('error', function (error) {
  //       console.log(error.message);
  //     });
  // }
  // async handleSeed(data) {
  //   for (const d of data) {
  //     const author = await this.authorsRepository.count();
  //
  //     await this.repository.save({
  //       ...d,
  //       authors: author,
  //     });
  //     break;
  //   }
  //   return;
  // }
  //
  // async seed() {
  //   const count = await this.repository.count();
  //   const a = await this.authorsRepository.count()
  //   console.log(a);
  //   const filePath = path.join(process.cwd(), 'python/csvData/metaData.csv');
  //   if (count) {
  //     await this.readfile(filePath, this.handleSeed);
  //   }
  // }

  async readfile(filePath) {
    return new Promise((resolve, reject) => {
      const data = [];

      fs.createReadStream(filePath)
        .pipe(parse({ delimiter: ',', from_line: 2 }))
        .on('data', function (row) {
          const dir = row[0].split('.')[0];

          const d = {
            url: `genres_original/${dir}/${row[0]}`,
            title: row[1],
            artist: row[2],
            duration: row[4],
            releaseDate: row[5],
            album: row[6],
            genre: row[7],
            authors: row[3],
          };

          data.push(d);
        })
        .on('end', function () {
          resolve(data);
        })
        .on('error', function (error) {
          reject(error);
        });
    });
  }

  async handleSeed(data) {
    for (const d of data) {
      let author = await this.authorsRepository.findOne({
        where: { name: d.authors },
      });

      if (!author) {
        author = await this.authorsRepository.save({
          name: d.authors,
          birthday: new Date(),
        });
      }

      await this.repository.save({
        ...d,
        authors: [author],
      });
    }
  }

  async seed() {
    const count = await this.repository.count();

    const filePath = path.join(process.cwd(), 'python/csvData/metaData.csv');
    if (!count) {
      try {
        const data = await this.readfile(filePath);
        await this.handleSeed(data);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
}
