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
import {Absensi} from '../models';
import {AbsensiRepository} from '../repositories';

export class AbsensiController {
  constructor(
    @repository(AbsensiRepository)
    public absensiRepository : AbsensiRepository,
  ) {}

  @post('/absensis')
  @response(200, {
    description: 'Absensi model instance',
    content: {'application/json': {schema: getModelSchemaRef(Absensi)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Absensi, {
            title: 'NewAbsensi',
            exclude: ['id'],
          }),
        },
      },
    })
    absensi: Omit<Absensi, 'id'>,
  ): Promise<Absensi> {
    return this.absensiRepository.create(absensi);
  }

  @get('/absensis/count')
  @response(200, {
    description: 'Absensi model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Absensi) where?: Where<Absensi>,
  ): Promise<Count> {
    return this.absensiRepository.count(where);
  }

  @get('/absensis')
  @response(200, {
    description: 'Array of Absensi model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Absensi, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Absensi) filter?: Filter<Absensi>,
  ): Promise<Absensi[]> {
    return this.absensiRepository.find(filter);
  }

  @patch('/absensis')
  @response(200, {
    description: 'Absensi PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Absensi, {partial: true}),
        },
      },
    })
    absensi: Absensi,
    @param.where(Absensi) where?: Where<Absensi>,
  ): Promise<Count> {
    return this.absensiRepository.updateAll(absensi, where);
  }

  @get('/absensis/{id}')
  @response(200, {
    description: 'Absensi model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Absensi, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Absensi, {exclude: 'where'}) filter?: FilterExcludingWhere<Absensi>
  ): Promise<Absensi> {
    return this.absensiRepository.findById(id, filter);
  }

  @patch('/absensis/{id}')
  @response(204, {
    description: 'Absensi PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Absensi, {partial: true}),
        },
      },
    })
    absensi: Absensi,
  ): Promise<void> {
    await this.absensiRepository.updateById(id, absensi);
  }

  @put('/absensis/{id}')
  @response(204, {
    description: 'Absensi PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() absensi: Absensi,
  ): Promise<void> {
    await this.absensiRepository.replaceById(id, absensi);
  }

  @del('/absensis/{id}')
  @response(204, {
    description: 'Absensi DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.absensiRepository.deleteById(id);
  }
}
