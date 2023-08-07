import mongoose, { Schema } from "mongoose";

const quesSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    statement : String,
    answers: [
      {
        answerText: { type: String},
        answeredBy: { type: Schema.Types.ObjectId, ref: "User"},
        upvotes: { type: Map, of: Boolean, default: {} },
        downvotes: { type: Map, of: Boolean, default: {} },
      }
    ],
    picturePath: String,
    userPicturePath: String,
  },
  { timestamps: true }
);

const Ques = mongoose.model("Ques", quesSchema);

export default Ques;
