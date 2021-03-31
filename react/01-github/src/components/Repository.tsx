export interface RepositoryProps {
  repository: {
    name: string
    description: string
    html_url: string
  }
}

export default function Repository({ repository }: RepositoryProps) {
  return (
    <li>
      <strong>{repository.name}</strong>
      <p>{repository.description}</p>

      <a href={repository.html_url}>Acessar repositório</a>
    </li>
  )
}
