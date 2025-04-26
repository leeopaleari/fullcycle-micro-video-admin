import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './nest-modules/categories-module/categories.module';
import { DatabaseModule } from './nest-modules/database/database.module';

@Module({
  imports: [CategoriesModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
