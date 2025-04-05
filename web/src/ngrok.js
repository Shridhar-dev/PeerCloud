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
      isAvailable: true,
    },
  })
}

export const getNgrok = async (args, context) => {
  return Ngrok.findUnique({ where: { id: args.id } })
}

export const getAllNgrok = async(args,context)=>{
  return Ngrok.findMany({where: {isAvailable: true}});
}

export const updateNgrok = async(args,context)=>{
  console.log("hello")
  const { id } = args
  const { Ngrok } = context.entities
  return Ngrok.update({ where: { id }, data: { isAvailable: false } })
}