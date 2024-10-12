import Layout from '@layout/Layout.jsx'
import { Head, usePage } from '@inertiajs/react'

const Dashobard = ({user}) => {
  return (
    <>
      <Head title="Dashobard" />
      <h1>Welcome</h1>
      <p>Hello, welcome to your first Inertia app!</p>
    </>
  )
}

Dashobard.layout = page => <Layout children={page} title="Dashobard" />

export default Dashobard;
