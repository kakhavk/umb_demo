import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create({ auth, mustVerifyEmail, status, category }) {
    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        name: category.name,
    });
    const createCategory = (e) => {
        e.preventDefault();
        put(route('admin.categories.update', { id: category.id }), {
            onSuccess: () => reset(),
        });
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Categories" />
            <div className="mx-auto mt-4 w-1/2">
                <form onSubmit={createCategory} className="mt-6 space-y-6">
                    <TextInput
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        type="text"
                    />
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
