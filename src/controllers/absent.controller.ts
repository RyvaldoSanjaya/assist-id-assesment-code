import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Absensi, User} from '../models';
import {AbsensiRepository, UserRepository} from '../repositories';

export class AbsenstController {
  constructor(
    @repository(AbsensiRepository)
    public absensiRepository : AbsensiRepository,
    @repository(UserRepository)
    public userRepository : UserRepository,
  ) {}

  @post('/absentMasuk/{id}')
  async absenMasuk(
    @param.path.string('id') id: string
  ): Promise<Absensi> {
    const userDoc = await this.userRepository.findById(id);

    const updateParams= {
      tanggal: new Date(),
      nama: userDoc.nama,
      IdUser: userDoc.id,
      masuk: new Date(),
    }
    return this.absensiRepository.create(updateParams);
  }

  @patch('/absenKeluar/{id}')
  async absenKeluar(
    @param.path.string('id') id: string
  ): Promise<void> {
    const today = new Date();

    const theDoc = await this.absensiRepository.findOne({where: {
      tanggal: {
        gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        lt:new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1) 
      },
      IdUser: id
    }})

    const updateParams = {
      keluar: new Date()
    }
 
    await this.absensiRepository.updateById(theDoc!.id_absen, updateParams)
  }
}
