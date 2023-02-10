import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Absensi extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_absen?: string;

  @property({
    type: 'date',
    required: true,
  })
  tanggal: Date;

  @property({
    type: 'string',
    required: true,
  })
  nama: string;

  @property({
    type: 'date',
  })
  masuk: Date;

  @property({
    type: 'date',
  })
  keluar: Date;

  @property({
    type: 'string',
    required: true,
  })
  IdUser: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Absensi>) {
    super(data);
  }
}

export interface AbsensiRelations {
  // describe navigational properties here
}

export type AbsensiWithRelations = Absensi & AbsensiRelations;
