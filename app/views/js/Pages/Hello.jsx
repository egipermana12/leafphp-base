import { Link, Head } from '@inertiajs/react';

const Hello = ({ data }) => {

    return (
        <>
            <Head title="Hehe" />
            <div>
                <h1 className="text-blue-500">Hello World from React</h1>
                { data.map((data,index) => (
                    <p key={index}> { data.user } </p>
                )) }                
            </div>
        </>
    );
};

export default Hello;
