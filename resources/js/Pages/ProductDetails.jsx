import { Link, Head } from '@inertiajs/react';
import TextInput from '../Components/TextInput';
import { Table } from 'antd';

export default function ProductDetails({ product }) {
    
    return (
        <>
            <Head title="Products" />
            <div className='p-3'>
                <Link href={route('products.index')}>Home</Link>
                <Link href={route('admin.categories.index')} className='float-right'>Go To Admin</Link>
            </div>
            <div className="w-1/2 mx-auto">
                <h1>{product.name}</h1>
                <h3>{product.description}</h3>
                <p>Price: {product.price}</p>
                
            </div>
        </>
    );
}
