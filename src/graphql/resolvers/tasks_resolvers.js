import { ValidationError } from "apollo-server-express"
import Task from "../../modal/TaskModal.js"

export const tasksResolvers = {
  Query: {
    getAllTasks: async () => {
      try {
        // throw new ValidationError("Not Found")
        return (await Task.find({})).reverse()
      } catch (error) {
        console.log(error)
      }
    },
    getTask: async (parent, args, context, info) => {
      const { id } = args
      try {
        return await Task.findById(id)
      } catch (error) {
        console.log(error)
      }
    },
    getMyDayTasks: async () => {
      try {
        return await Task.find({ isMyDay: true })
      } catch (error) {
        console.log(error)
      }
    },
    getTaskBySearch: async (parent, args, context, info) => {
      const { title } = args
      try {
        let tasks = await Task.find({
          $and: [{ title: { $regex: title, $options: "$i" } }],
        })
        return tasks
      } catch (error) {
        console.log(error)
      }
    },
  },
  Mutation: {
    createTask: async (parent, args, context, info) => {
      try {
        const { title, description, dueDate, isMyDay, isFav, steps } = args.task
        const task = await Task({
          title,
          description,
          dueDate,
          isMyDay,
          isFav,
          steps,
        })
        await task.save()
        return task
      } catch (error) {
        console.log(error)
      }
    },
    updateTask: async (parent, args, context, info) => {
      try {
        const { title, description, dueDate, isMyDay, isFav, steps } = args.task
        const { id } = args
        let task = await Task.findById(id)
        if (title) {
          task.title = title
        }
        if (description) {
          task.description = description
        }
        if (dueDate) {
          task.dueDate = dueDate
        }
        if (typeof isMyDay == "boolean") {
          task.isMyDay = !task.isMyDay
        }
        if (typeof isFav == "boolean") {
          task.isFav = !task.isFav
        }
        if (steps && steps.length > 0) {
          task.steps = task?.steps?.concat(steps)
          console.log(task?.steps?.concat(steps))
        }
        await task.save()
        return task
      } catch (error) {
        console.log(error)
      }
    },
  },
}
