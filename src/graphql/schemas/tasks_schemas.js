import { gql } from "apollo-server-express"

export default gql`
  type Step {
    step: String
    _id: ID
  }
  input StepInput {
    step: String
  }

  type Task {
    _id: ID
    title: String
    description: String
    dueDate: String
    isMyDay: Boolean
    isFav: Boolean
    steps: [Step]
  }
  input TaskInput {
    title: String!
    description: String
    dueDate: String
    isMyDay: Boolean
    isFav: Boolean
    steps: [StepInput]
  }
  input TaskUpdateInput {
    title: String
    description: String
    dueDate: String
    isMyDay: Boolean
    isFav: Boolean
    steps: [StepInput]
  }

  type Query {
    getAllTasks: [Task]
    getTask(id: ID!): Task
  }
  type Mutation {
    createTask(task: TaskInput): Task
    updateTask(task: TaskUpdateInput, id: ID!): Task
  }
`
