import { Head, Link, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { useState } from 'react';

export default function Main({ auth, mustVerifyEmail, status, categories }) {
    const [confirmCategoryDeletion, setConfirmCategoryDeletion] =
        useState(false);
    const [categoryId, setCategoryId] = useState(null);

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

    const deleteCategory = () => {
        console.log(categoryId);

        destroy(route('admin.categories.destroy', { id: categoryId }), {
            onSuccess: () => reset(),
        });

        setConfirmCategoryDeletion(false);
        // setCategoryId(null);
    };

    const confirmDeletion = (e) => {
        setCategoryId(e.target.dataset.id);
        setConfirmCategoryDeletion(true);
    };
    const closeModal = () => {
        setConfirmCategoryDeletion(false);
        setCategoryId(null);

        reset();
    };
    return (
        <>
            <Modal show={confirmCategoryDeletion} onClose={closeModal}>
                <PrimaryButton onClick={deleteCategory}></PrimaryButton>
            </Modal>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Categories" />
                <div className="mx-auto mt-4 w-1/2">
                    <PrimaryButton
                        onClick={goTo}
                        data-url={route('admin.categories.create')}
                    >
                        Add Category
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
                            {categories.map((category) => {
                                return (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td className="text-right pr-2">
                                            <Link
                                                href={route(
                                                    'admin.categories.edit',
                                                    {
                                                        id: category.id,
                                                    }
                                                )}
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={confirmDeletion}
                                                data-id={category.id}
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
