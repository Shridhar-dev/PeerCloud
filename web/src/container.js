import { HttpError } from 'wasp/server'

export const createContainer = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'User not authenticated.')
  }

  const { containerName,url,repoLink,type,entrypoint, isDone } = args
  const { Container } = context.entities

  return await Container.create({
    data: {
      containerName,url,repoLink,type,entrypoint,
      isDone,
      user: {
        connect: {
          id: context.user.id,
        },
      },
    },
  })
}
// model Container {
//   id          Int @id @default(autoincrement())
//   containerName String
//   url         String
//   repoLink    String
//   type        String
//   entrypoint  String
//   userId      Int
//   user        User    @relation(fields: [userId], references: [id])
// }