import Layout from '@layout/Layout.jsx'
import { Head } from '@inertiajs/react'

const Dashobard = () => {
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
