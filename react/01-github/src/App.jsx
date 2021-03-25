import Repository from './components/Repository'

import './styles/global.scss'

export default function App() {
  return (
    <section className="repositories">
      <h1>Lista de repositórios</h1>

      <ul>
        <Repository />
        <Repository />
        <Repository />
        <Repository />
      </ul>
    </section>
  )
}
