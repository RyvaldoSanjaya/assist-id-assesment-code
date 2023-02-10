import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Izin, IzinRelations} from '../models';

export class IzinRepository extends DefaultCrudRepository<
  Izin,
  typeof Izin.prototype.id_izin,
  IzinRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Izin, dataSource);
  }
}
