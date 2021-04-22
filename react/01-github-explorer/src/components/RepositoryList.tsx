import { useEffect, useState } from 'react';
import { Repository, RepositoryProps } from './Repository';

import '../styles/repositories.scss';

export function RepositoryList() {
  const [repositories, setRepositories] = useState<RepositoryProps[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/orgs/rocketseat/repos')
      .then(response => response.json())
      .then(data => setRepositories(data));
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de Repositórios</h1>

      <ul>
        {repositories?.map(repository => (
          <Repository key={repository.id} {...repository} />
        ))}
      </ul>
    </section>
  );
}
