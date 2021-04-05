import { withRouter } from 'next/router'
import Link from 'next/link'

function Sidebar({ router }) {
  const routes = [
    { link: '/', label: 'Venta' },
    { link: '/almacen', label: 'Almacen' },
    { link: '/facturas', label: 'Facturas' },
    { link: '/reporte', label: 'Reporte' },
  ]

  return (
    <nav id="sidebar">
      <div className="sidebar-header">
        <h3>Agencia Brenda</h3>
      </div>
      <ul className="list-unstyled components">
        {routes.map(route => {

          return (
            <li key={route.link} className={route.link == router.pathname ? 'active' : ''}>
              <Link href={route.link}>
                <a>{route.label}</a>
              </Link>
            </li>
          )
        })
        }
      </ul>
    </nav>
  )
}
export default withRouter(Sidebar)
