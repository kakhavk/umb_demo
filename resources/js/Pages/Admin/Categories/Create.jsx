import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create({ auth, mustVerifyEmail, status }) {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        name: '',
    });
    const createCategory = (e) => {
        e.preventDefault();
        post(route('admin.categories.store'),{
            onSuccess: (e) => {
                console.log(e);
            }
        });
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Categories" />
            <form onSubmit={createCategory} className="mt-6 space-y-6">
                <TextInput
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    type="text"
                />
                <PrimaryButton disabled={processing}>Save</PrimaryButton>
            </form>
        </AuthenticatedLayout>
    );
}
