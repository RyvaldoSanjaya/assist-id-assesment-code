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
import {Absensi, Izin, User} from '../models';
import {AbsensiRepository,IzinRepository,UserRepository} from '../repositories';

interface MintaIzinBodyRequest {
  tgl_mulai_cuti: string;
  tgl_akhir_cuti: string;
}

interface HitungIzinBodyRequest {
  bulan: number;
  tahun: number;
}

export class ApprovalController {
  constructor(
    @repository(AbsensiRepository)
    public absensiRepository : AbsensiRepository,
    @repository(IzinRepository)
    public izinRepository : IzinRepository,
    @repository(UserRepository)
    public userRepository : UserRepository,
  ) {}

  @post('/mintacuti/{id}')
  async MintaIzin(
    @param.path.string('id') id: string, 
    @requestBody({
      content: {
        'application/json' :{
          schema: {
            tgl_mulai_cuti: "string",
            tgl_akhir_cuti: "string"
          }
        }
      }
    }) body: MintaIzinBodyRequest,
    ): Promise<Izin> {
    const updateFields = await this.userRepository.findById(id);

    const newDoc = {
      IdUser: id,
      keterangan: "Cuti",
      nama: updateFields.nama,
      status: false,
      tgl_izin: new Date(),
      tgl_approve: null,
      tgl_mulai_cuti: new Date(body.tgl_mulai_cuti),
      tgl_akhir_cuti: new Date(body.tgl_akhir_cuti)
    };

    return await this.izinRepository.create(newDoc);
  }
  
  @post('/mintaizin/{id}')
  async MintaCuti(@param.path.string('id') id: string): Promise<Izin> {
    const updateFields = await this.userRepository.findById(id);

    const newDoc = {
      IdUser: id,
      keterangan: "Izin",
      nama: updateFields.nama,
      status: false,
      tgl_izin: new Date(),
      tgl_approve: null
      
    };

    return await this.izinRepository.create(newDoc);
  }

  @get('/listnoapprove')
  @response(200, {
    description: 'list belum approve',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Izin, {includeRelations: true}),
        },
      },
    },
  })
  async findNoApprove(): Promise<Izin[]> {
    return this.izinRepository.find({
      where: {
        status: false,
        tgl_approve: {eq: null}
      }
    }
    )
  }

  @patch('/approval/{id}')
  @response(204, {
    description: 'approve izin',
  })
  async approveIzin(
    @param.path.string('id') id: string,
  ): Promise<void> {
    const updateFields = {
      status: true,
      tgl_approve: new Date()
    }
    await this.izinRepository.updateById(id, updateFields);
  }

  @patch('/denied/{id}')
  @response(204, {
    description: 'denied approve izin',
  })
  async deniedIzin(
    @param.path.string('id') id: string,
  ): Promise<void> {
    const updateFields = {
      status:false,
      tgl_approve: new Date()
    }
    await this.izinRepository.updateById(id, updateFields);
  }

  @get('/haricount/{id}')
  async hitunganHari(
    @param.path.string('id') id: string,
  ): Promise<object> {

    let totalHari = 0;
    let totalDocumentApprove= 0;

    const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

    const listDocIzin = await this.izinRepository.find({
      where: {
        IdUser: id,
        status: true,
        keterangan: 'Izin',
        tgl_izin: {gt: Date.now() - ONE_MONTH}
      } 
    })

    totalHari += listDocIzin.length;
    totalDocumentApprove += listDocIzin.length;

    const listDoc = await this.izinRepository.find({
      where: {
        IdUser: id,
        status: true,
        keterangan: 'Cuti',
        tgl_mulai_cuti: {gt: Date.now() - ONE_MONTH}
      }
    })

    let totalAmbilCuti = 0
    let totalHariCuti1Bulan = 0

    for (const x of listDoc) {
      const totalHariPerDoc = countDays(x.tgl_akhir_cuti, x.tgl_mulai_cuti);
      totalHari += totalHariPerDoc;
      totalHariCuti1Bulan += totalHariPerDoc;
      totalDocumentApprove += 1;
      totalAmbilCuti +=1;
    }

    const totalDocument = await this.izinRepository.find({where: {
      IdUser: id
    }})

    const totalIzinNoApprove = totalDocument.length - totalDocumentApprove;


    const jamMasuk = 8;
    const theDateToday = new Date();
    const oneMonthsBefore = new Date(Date.now() - ONE_MONTH);


    const totalDocTelat = await this.absensiRepository.find({
      where: {
        masuk: {
          gte: new Date(oneMonthsBefore.getFullYear(), oneMonthsBefore.getMonth(), oneMonthsBefore.getDate(), jamMasuk,0,0,0),
        }
      }
    })

    const responses = {
      totalTelat: totalDocTelat.length,
      totalAmbilCutiAcc: totalDocumentApprove,
      TotalAmbilCutiNonAcc: totalIzinNoApprove,
      totalHariCutiDalam1Bulan: totalHariCuti1Bulan,

    }

    return responses;
  }
}


function countDays(date1: Date, date2: Date): number {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return dayDiff;
}