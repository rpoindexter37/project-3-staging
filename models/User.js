//user model
const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  userSchema = new mongoose.Schema({
    local: {
      name: String,
      email: String,
      password: String
    },
    playlists: [{type: mongoose.Schema.Types.ObjectId, ref: 'Playlist'}]
  })

userSchema.pre('findOne', function() {
  this.populate('playlists')
})

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema)
