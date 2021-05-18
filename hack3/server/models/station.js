import mongoose from 'mongoose'

const Schema = mongoose.Schema

const StationSchema = Schema({
  station_id: { type: String, unique: true },
  station_name: String,
  station_type: String,
  station_order: Number,
  address: String,
  service_counter: String,
  enable_bicycle: String,
  distance_to_next: Number
}, {
  collection: 'station',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const exportSchema = mongoose.model('station', StationSchema)

export default exportSchema
