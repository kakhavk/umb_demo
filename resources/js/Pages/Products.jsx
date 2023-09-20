import { Link, Head, router } from '@inertiajs/react';
import TextInput from '../Components/TextInput';
import { Table } from 'antd';

export default function Products({ products }) {
    const gpTo = (e) => {
        const tr = e.target.closest('tr');
        router.get(route('products.show', { id: tr.dataset.rowKey }));
    };

    const productDelete = (e) => {
        const tr = e.target.closest('tr');
        router.delete(route('products.destroy', { id: tr.dataset.rowKey }));
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (actions) => {
                return <>
                    <div onClick={gpTo} className='m-2'>Show</div>
                    /
                    <div onClick={productDelete} className='m-2'>Delete</div>
                </>;
            },
        },
    ];
    let productsData = [];
    for (let i = 0; i < products.length; i++) {
        productsData.push({
            key: products[i].id,
            id: products[i].id,
            name: (
                <div>
                    <Link href={route('products.show', { id: products[i].id })}>
                        {products[i].name}
                    </Link>
                </div>
            ),
            description: (
                <Link href={route('products.show', { id: products[i].id })}>
                    {products[i].description.substring(0, 30) + '...'}
                </Link>
            ),
            price: products[i].price,
        });
    }
    return (
        <>
            <Head title="Products" />
            <div className="p-3">
                <Link href={route('products.index')}>Home</Link>
                <Link
                    href={route('admin.categories.index')}
                    className="float-right"
                >
                    Go To Admin
                </Link>
            </div>
            <div className="w-1/2 mx-auto">
                <h1>Products</h1>
                <Table columns={columns} dataSource={productsData} />
            </div>
        </>
    );
}
