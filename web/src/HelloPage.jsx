import { useParams } from 'react-router-dom'

export const HelloPage = () => {
  const { name } = useParams()
  return <div>Here's {name}!</div>
}