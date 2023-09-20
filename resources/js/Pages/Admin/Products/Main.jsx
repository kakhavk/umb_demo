import { Head, Link, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { useState } from 'react';

export default function Main({ auth, mustVerifyEmail, status, products }) {
    const [confirmProductDeletion, setConfirmProductDeletion] =
        useState(false);
    const [productId, setProductId] = useState(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        id: '',
    });

    const goTo = (e) => {
        router.get(e.target.dataset.url);
    };

    const deleteProduct = () => {
        console.log(productId);

        destroy(route('admin.products.destroy', { id: productId }), {
            onSuccess: () => reset(),
        });

        setConfirmProductDeletion(false);
        // setProductId(null);
    };

    const confirmDeletion = (e) => {
        setProductId(e.target.dataset.id);
        setConfirmProductDeletion(true);
    };
    const closeModal = () => {
        setConfirmProductDeletion(false);
        setProductId(null);

        reset();
    };
    return (
        <>
            <Modal show={confirmProductDeletion} onClose={closeModal}>
                <PrimaryButton onClick={deleteProduct}></PrimaryButton>
            </Modal>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Products" />
                <div className="mx-auto mt-4 w-1/2">
                    <PrimaryButton
                        onClick={goTo}
                        data-url={route('admin.products.create')}
                    >
                        Add Product
                    </PrimaryButton>

                    <table className="table-auto w-full text-sm mt-3">
                        <thead>
                            <tr className="bg-slate-300">
                                <th>#</th>
                                <th>Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                return (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td className="text-right pr-2">
                                            <Link
                                                href={route(
                                                    'admin.products.edit',
                                                    {
                                                        id: product.id,
                                                    }
                                                )}
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={confirmDeletion}
                                                data-id={product.id}
                                                className="ml-4"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
