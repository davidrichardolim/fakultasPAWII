import mongoose, { connectDB } from '../config/database.js'
import FakultasModel from '../model/fakultas.model.js'
import ProdiModel from '../model/prodi.model.js'

const samples = [
  {
    fakultas: 'Fakultas Ilmu Komputer',
    prodi: [
      { kode: 'TI001', nama_prodi: 'Teknik Informatika' },
      { kode: 'SI001', nama_prodi: 'Sistem Informasi' },
      { kode: 'TK001', nama_prodi: 'Teknik Komputer' },
      { kode: 'MI001', nama_prodi: 'Manajemen Informatika' },
      { kode: 'SD001', nama_prodi: 'Sains Data' },
    ],
  },
  {
    fakultas: 'Fakultas Ekonomi',
    prodi: [
      { kode: 'MN001', nama_prodi: 'Manajemen' },
      { kode: 'AK001', nama_prodi: 'Akuntansi' },
      { kode: 'EP001', nama_prodi: 'Ekonomi Pembangunan' },
      { kode: 'BD001', nama_prodi: 'Bisnis Digital' },
      { kode: 'EK001', nama_prodi: 'Ekonomi Syariah' },
    ],
  },
  {
    fakultas: 'Fakultas Teknik',
    prodi: [
      { kode: 'TS001', nama_prodi: 'Teknik Sipil' },
      { kode: 'TM001', nama_prodi: 'Teknik Mesin' },
      { kode: 'TE001', nama_prodi: 'Teknik Elektro' },
      { kode: 'TIN01', nama_prodi: 'Teknik Industri' },
      { kode: 'AR001', nama_prodi: 'Arsitektur' },
    ],
  },
  {
    fakultas: 'Fakultas Hukum',
    prodi: [
      { kode: 'HK001', nama_prodi: 'Ilmu Hukum' },
      { kode: 'HB001', nama_prodi: 'Hukum Bisnis' },
      { kode: 'HT001', nama_prodi: 'Hukum Tata Negara' },
      { kode: 'HP001', nama_prodi: 'Hukum Pidana' },
      { kode: 'HI001', nama_prodi: 'Hukum Internasional' },
    ],
  },
  {
    fakultas: 'Fakultas Kedokteran',
    prodi: [
      { kode: 'KD001', nama_prodi: 'Pendidikan Dokter' },
      { kode: 'KG001', nama_prodi: 'Kedokteran Gigi' },
      { kode: 'KP001', nama_prodi: 'Keperawatan' },
      { kode: 'FM001', nama_prodi: 'Farmasi' },
      { kode: 'GZ001', nama_prodi: 'Gizi' },
    ],
  },
]

const counts = { fakultas: 0, prodi: 0 }

try {
  await connectDB()
  await Promise.all([FakultasModel.init(), ProdiModel.init()])
  await mongoose.connection.dropDatabase()
  console.log('Database cleared')
  await FakultasModel.createIndexes()
  await ProdiModel.createIndexes()

  const faculties = []
  for (const sample of samples) {
    faculties.push(await FakultasModel.create({ name: sample.fakultas }))
    counts.fakultas += 1
  }

  for (const [index, sample] of samples.entries()) {
    const facultyId = faculties[index]._id
    for (const prodi of sample.prodi) {
      await ProdiModel.create({ ...prodi, fakultas: facultyId })
      counts.prodi += 1
    }
  }
} catch (error) {
  console.error('Seeding failed:', error.message)
  process.exitCode = 1
} finally {
  for (const [model, count] of Object.entries(counts)) {
    console.log(`${model}: ${count} inserted`)
  }
  try {
    await mongoose.disconnect()
  } catch (error) {
    console.error('MongoDB disconnect failed:', error.message)
    process.exitCode = 1
  }
}