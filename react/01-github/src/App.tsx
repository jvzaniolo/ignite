import { useState, useEffect } from 'react'
import Repository, { RepositoryProps } from './components/Repository'

import './styles/global.scss'

interface Repository {
  name: string
  description: string
  html_url: string
}

export default function App() {
  const [repositories, setRepositories] = useState<Repository[]>([])

  useEffect(() => {
    fetch('https://api.github.com/orgs/rocketseat/repos')
      .then((response) => response.json())
      .then((data) => setRepositories(data))
  }, [])

  return (
    <section className="repositories">
      <h1>Lista de repositórios</h1>

      <ul>
        {repositories.map((repository) => (
          <Repository key={repository.name} repository={repository} />
        ))}
      </ul>
    </section>
  )
}
