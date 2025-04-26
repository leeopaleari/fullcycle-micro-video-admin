import { Module } from '@nestjs/common';
import { CategoriesModule } from './nest-modules/categories-module/categories.module';
import { DatabaseModule } from './nest-modules/database/database.module';

@Module({
  imports: [CategoriesModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
