/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform } from 'class-transformer';

export type PaginationPresenterProps = {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
};

export class PaginationPresenter {
  @Transform(({ value }: { value: string }) => parseInt(value))
  current_page: number;

  @Transform(({ value }: { value: string }) => parseInt(value))
  per_page: number;

  @Transform(({ value }: { value: string }) => parseInt(value))
  last_page: number;

  @Transform(({ value }: { value: string }) => parseInt(value))
  total: number;

  constructor(props: PaginationPresenterProps) {
    this.current_page = props.current_page;
    this.per_page = props.per_page;
    this.last_page = props.last_page;
    this.total = props.total;
  }
}
