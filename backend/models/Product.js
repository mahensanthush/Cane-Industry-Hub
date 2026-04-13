const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // භාණ්ඩය අයිති Seller ව හඳුනා ගැනීමට
  title: {
    si: { type: String, required: true },
    en: { type: String, required: true }
  },
  category: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  originalPrice: { type: Number, default: 0 },
  stock: { type: Number, required: true, default: 0 },
  images: [{ type: String }], // මෙහි Base64 strings හෝ Image URLs ගබඩා වේ
  tags: [String],
  colors: [{
    code: String,
    si: String,
    en: String
  }],
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);