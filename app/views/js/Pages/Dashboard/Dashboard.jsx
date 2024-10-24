import Layout from '@layout/Layout.jsx'
import { Head, usePage } from '@inertiajs/react'

const Dashobard = () => {
  const { user } = usePage().props;
  console.log(user)
  return (
    <>
      <Head title="Dashobard" />
      <h1>Welcome</h1>
      <p>Hello, welcome to your first Inertia app!</p>

      <div className="flex flex-col items-center justify-center pt-5 pb-6 relative">
        <img className="object-cover h-auto max-w-full rounded-lg" src={user} alt="image description"/>
      </div>
    </>
  )
}

Dashobard.layout = page => <Layout children={page} title="Dashobard" />

export default Dashobard;
