export type RepositoryProps = {
  name: string
  description: string
  html_url: string
}

type RepositoryTypes = {
  repository: RepositoryProps
}

export default function Repository({ repository }: RepositoryTypes) {
  return (
    <li>
      <strong>{repository.name}</strong>
      <p>{repository.description}</p>

      <a href={repository.html_url}>Acessar repositório</a>
    </li>
  )
}
