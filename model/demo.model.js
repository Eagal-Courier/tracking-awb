const mongooes = require("mongoose");

const NameSchema = mongooes.Schema(
  {
    name: { type: String, required: true, default: "Global" },
  },
  {
    collection: "demo",
    versionKey: false,
    timestamps: true,
  }
);

const NameModel = mongooes.model("NameSchema", NameSchema);

module.exports = NameModel;
