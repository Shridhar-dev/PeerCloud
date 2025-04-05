import { HttpError } from 'wasp/server'

export const createNgrok = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401, 'User not authenticated.')
  }
  const { url } = args
  const { Ngrok } = context.entities
  return await Ngrok.create({
    data: {
      url,
      user: {
        connect: {
          id: context.user.id,
        },
      },
    },
  })
}