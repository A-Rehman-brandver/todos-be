import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: String,
    },
    isMyDay: {
      type: Boolean,
      default: false,
    },
    isFav: {
      type: Boolean,
      default: false,
    },
    steps: [
      {
        step: {
          type: String,
        },
      },
    ],
  },
  { timestamps: { createdAt: "created_at" } }
)

const Task = mongoose.model("task", TaskSchema)

export default Task
