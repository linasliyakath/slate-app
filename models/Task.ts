import mongoose, { Schema, models } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Prevent "OverwriteModelError" in dev, but ensure we pick up schema changes
if (process.env.NODE_ENV === "development") {
  delete models.Task;
}

export const Task = models.Task || mongoose.model("Task", TaskSchema);
