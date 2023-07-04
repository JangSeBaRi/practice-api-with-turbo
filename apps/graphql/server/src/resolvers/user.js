const userResolver = {
  Query: {
    users: (parent, args, { db: users }) => Object.values(users),
    user: (parent, { id }, { db: users }) => users[id],
  },
}

export default userResolver
