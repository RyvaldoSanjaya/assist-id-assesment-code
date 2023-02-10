import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Izin extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_izin?: string;

  @property({
    type: 'string',
    required: true,
  })
  keterangan: string;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @property({
    type: 'date',
  })
  tgl_izin: Date;

  @property({
    type: 'date',
  })
  tgl_approve: Date | null;

  @property({
    type: 'string',
    required: true,
  })
  nama: string;

  @property({
    type: 'string',
    required: true,
  })
  IdUser: string;

  @property({
    type: 'date',
  })
  tgl_mulai_cuti: Date;

  @property({
    type: 'date',
  })
  tgl_akhir_cuti: Date;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Izin>) {
    super(data);
  }
}

export interface IzinRelations {
  // describe navigational properties here
}

export type IzinWithRelations = Izin & IzinRelations;
