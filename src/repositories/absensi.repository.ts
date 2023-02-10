import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Absensi, AbsensiRelations} from '../models';

export class AbsensiRepository extends DefaultCrudRepository<
  Absensi,
  typeof Absensi.prototype.id_absen,
  AbsensiRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Absensi, dataSource);
  }
}
