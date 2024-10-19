const mongoose = require("mongoose");

const fineSchema = new mongoose.Schema({
  issue_id: {
    type: Schema.Types.ObjectId,
    ref: "IssueBook", // Reference to the IssueBook model
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  fine_date: {
    type: Date,
    default: Date.now,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the `updated_at` field on save
// fineSchema.pre("save", function (next) {
//   this.updated_at = Date.now();
//   next();
// });

module.exports = mongoose.model("Fine", fineSchema);
